import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import BigTitle from '../../components/bigTitle/index.jsx'
import RecommendTitle from '../../components/recommendTitle/index.jsx'
import TitleColumn from '../../components/titleColumn/index.jsx'
import PlayList from './playList/index.jsx'
import Album from './album/index.jsx'
import SongInformation from './songInfo/index.jsx'
import SingerSelf from './singerSelf/index.jsx'
import {handleSingerName} from '../../common/js/createSongForExploreNewSong.js'
import {initScroll} from '../../common/js/initBetterScroll.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {mapState} from '../../store/reducers/mapState.js'
import * as searchHistoryActions from '../../store/actions/playerAndSaveSearchHistory.js'
import {getKeySong,search,multiSearch} from '../../api/search.js'
import {getSongUrl} from '../../api/getSongDetail.js'
import {getAlbumInfo} from '../../api/getAlbumInfo.js'
import {debunce} from '../../common/js/util.js'

import './style.styl'
import './icon.styl'

class Search extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      hotKey: [],
      searchContent: '',
      initDone: false,
      singerSongs: [],
      songsCount: 0,
      singerAlbums: [],
      albumCount: 0,
      singerSelf: [],
      singerCount: 0,
      playList: [],
      playListCount: 0,
      currentResult: 'song'
    }
  }
    componentWillMount() {
      this.singerSongsOffset = 0
      this.singerAlbums = 0
      this.singerSelf = 0
      this.singerPlaylist = 0
      this.cates = {
        'song': 1,
        'album': 10,
        'singer': 100,
        'playList': 1000,
        '用户': 1002,
        'MV': 1004,
        '歌词': 1006,
        '电台': 1009
      }
      this.songOffset = 0
      this.albumOffset = 0
      this.singerOffset = 0
      this.playListOffset = 0
    }
    componentDidMount() {
      this._initHotSongs()
      this.searchResultSlider = initScroll(this.searchResult)
      this.searchResultSlider.on('scroll' , debunce(() =>{
        let searchResult = this.searchResult.getBoundingClientRect().bottom
        let searchResultScroll = this.searchResultScroll.getBoundingClientRect().bottom
        if(searchResult - searchResultScroll > 20) {
          switch(this.state.currentResult) {
            case 'song':
              if(this.state.singerSongs.length === this.state.songsCount) {
                break
              }
              this._search(this.state.searchContent,20,this.songOffset+20,1)
              break

            case 'album':
              if(this.state.singerAlbums.length === this.state.albumCount) {
                break
              }
              this._search(this.state.searchContent,20,this.albumOffset+20,10)
              break

            case 'singer':
              if(this.state.singerSelf.length === this.state.singerCount) {
                break
              }
              _search(this.state.searchContent,20,this.singerOffset+20,100)
              break

            case 'playList':
              if(this.state.playList.length === this.state.playListCount) {
                break
              }
              this._search(this.state.searchContent,20,this.playListOffset+20,1000)
              break

            default:
              return
          }
          if(this.ifMoreComment) {
            getSongComment(this.props.player.currentSong.id,10,this.commentOffset+10).then((res) =>{
              if(res.code === 200) {
                this.ifMoreComment = res.more
                let com = []
                if(res.comments.length > 0) {
                  res.comments.map((item) =>{
                    com.push(createComment(item))
                    console.log('com length is ' + com.length)
                  })
                  this.newComments = this.newComments.concat(com)
                  console.log('newCom的长度是 ' + this.newComments.length)
                }
                this.commentOffset += 10
              }
            })
          }
        }
      },400))
    }
    componentDidUpdate() {
      if(this.searchResultSlider) {
        this.searchResultSlider.refresh()
      }
    }
    _initHotSongs() {
      getKeySong().then((res) =>{
        if(res.code === 0) {
          this.setState({
            hotkey: res.data.hotkey.slice(0,10),
            initDone: true
          })
        }
      })
    }
    hotKeyClick(key) {
       this.setState({
        searchContent: key
      })
      this.emptyState()
      this._search(key,20,0,1)
      this.props.saveSearchHistory(key)
    }
    //监听搜索框的内容变化，并将内容记录在state中
    inputChange(e) {
      debunce(this.setState({
        searchContent: e.target.value
      }),400)
    }
    //按下enter键,开始进行搜索,并将搜索框中的内容通过redux放入搜索记录
    enterInput(e) {
      if(e.keyCode === 13) {
        debunce(this.props.saveSearchHistory(this.state.searchContent),800)
      }
      this.emptyState()
      this._search(this.state.searchContent,20,0,1)
    }
    //开始搜索
    _search(keyword,limit,offset,type) {
      search(keyword,limit,offset,type).then((res) =>{
        if(res.code === 200) {
          switch(type) {
            case 1: 
              let songs = []
              let songsCount = 0
              console.log(res)
              res.result.songs.map((item) =>{
                songs.push({
                  id: item.id,
                  name: item.name,
                  singer: {id: item.artists[0].id,name: handleSingerName(item.artists)},
                  album: {id: item.album.id,name: item.album.name},
                  duration: item.duration / 1000
                })
              })
              if(this.state.singerSongs.length > 0) {
                let ret = this.state.singerSongs.concat(songs)
                this.setState({
                  singerSongs: ret
                })
                this.songOffset += 20
                console.log(ret.length)
                break
              }
              songsCount = res.result.songCount
              this.setState({
                singerSongs: songs,
                songsCount: songsCount,
                initDone: true
              })
              break

            case 10:
              let albums = []
              let albumCount = 0
              res.result.albums.map((item) =>{
                albums.push({
                  albumId: item.id,
                  albumName: item.name,
                  picUrl: item.picUrl,
                  singerId: item.artists[0].id,
                  singerName: item.artists[0].name
                })
              })
              if(this.state.singerAlbums.length > 0) {
                let ret = this.state.singerAlbums.concat(albums)
                this.setState({
                  singerAlbums: ret
                })
                this.albumOffset += 20
                console.log(ret.length)
                break
              }
              albumCount = res.result.albumCount
              this.setState({
                singerAlbums: albums,
                albumCount: albumCount,
                initDone: true
              })
              break

            case 100:
              let singerSelf = []
              let singerCount = 0
              res.result.artists.map((item) =>{
                singerSelf.push({
                  singeId: item.id,
                  singerName: item.name,
                  picUrl: item.picUrl,
                  alia: item.alias[0]
                }) 
              })
              if(this.state.singerSelf.length > 0) {
                let ret = this.state.singerSelf.concat(singerSelf)
                this.setState({
                  singerSelf: ret
                })
                this.singerOffset += 20
                console.log(ret.length)
                break
              }
              singerCount = res.result.artistCount
              this.setState({
                singerSelf: singerSelf,
                singerCount: singerCount,
                initDone: true
              })
              break

            case 1000:
              let playList = []
              let playListCount = 0
              res.result.playlists.map((item) =>{
                playList.push({
                  playListId: item.id,
                  playListName: item.name,
                  playListCreatorId: item.creator.userId,
                  playListCreatorName: item.creator.nickname,
                  playCount: item.playCount,
                  songsCount: item.trackCount,
                  picUrl: item.coverImgUrl
                })
              })
              if(this.state.playList.length > 0) {
                let ret = this.state.playList.concat(playList)
                this.setState({
                  playList: ret
                })
                this.playListOffset += 20
                console.log(ret.length)
                break
              }
              playListCount = res.result.playlistCount
              this.setState({
                playList: playList,
                playListCount: playListCount,
                initDone: true
              })
              break

            default:
              retrun 
          }
        }  
      })
    }
    //点击搜索记录,将该搜索记录重新放入搜索框中并进行搜索，此时并不需要按下enter键和点击搜索符号即可进行搜索
    searchHistoryClick(item) {
      this.setState({
        searchContent: item
      })
      this.emptyState()
      this._search(item,20,0,1)
    }
    //点击搜索历史右上角的垃圾桶符号,清空搜索历史中的内容
    deleteAllSearchHis() {
      //如果redux中searchHistory为空,直接返回
      if(this.props.searchHistory.length === 0) {
        return 
      }
      this.props.deleteAllHistory()
    }
    //点击搜索历史列表中每个记录的叉号,将该记录从搜索历史中的删除
    deleteSearchHisItem(item,e) {
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
      this.props.deleteHistory(item)
    }
    //点击搜索框中的叉号,清空搜索框中的输入内容
    deleteSearchBoxContent() {
      this.setState({
        searchContent: ''
      })
    }
    //对搜索结果进行分类,切换至特定的类型的内容(单曲,专辑,歌手,歌单)
    navClick(item) {
      switch(item) {
        case '单曲' :
          this.setState({
            currentResult: 'song'
          })
          if(this.state.singerSongs.length === 0) {
            this._search(this.state.searchContent,20,0,1)
          }
          break
        
        case '专辑':
          this.setState({
            currentResult: 'album'
          })
          if(this.state.singerAlbums.length === 0) {
            this._search(this.state.searchContent,20,0,10)
          }
          break

        case '歌手':
          this.setState({
            currentResult: 'singer'
          })
          if(this.state.singerSelf.length === 0) {
            this._search(this.state.searchContent,20,0,100)
          }
          break

        case '歌单':
          this.setState({
            currentResult: 'playList'
          })
          if(this.state.playList.length === 0) {
            this._search(this.state.searchContent,20,0,1000)
          }
          break

        default:
          return
      }
    }
    emptyState() {
      if(this.state.singerAlbums.length === this.state.singerSelf.length === this.state.playListCount.length === 0) {
        return 
      }
      this.setState({
        singerSongs: [],
        songsCount: 0,
        singerAlbums: [],
        albumCount: 0,
        singerSelf: [],
        singerCount: 0,
        playList: [],
        playListCount: 0
      })
    }
    //将搜索道德歌曲添加到redux的player
    addSearchSongToPlayer(song) {
      let newSong = null
      getAlbumInfo(song.album.id).then((res) =>{
        if(res.code === 200) {
          newSong = {...song,album: {id: song.album.id, name: song.album.name, picUrl: res.songs[0].al.picUrl}}
          getSongUrl(song.id).then((res) =>{
            if(res.code === 200) {
              newSong = {...newSong,url: res.data[0].url}
              this.props.addSongToPlayList(newSong)
              this.props.setCurrentIndex(this.props.player.playList.length - 1)
              this.props.setCurrentSong()
              this.props.setPlayingState(true)
            }
          })
        }
      })
    }
    render() {
        return (
            <div className="search-wrapper">
              <BigTitle title={'搜索'}/>
              <div className="search-top-wrapper">
                <div className="search-top">
                  <input className="search-top-input" 
                      placeholder="搜索音乐,歌手,用户,歌词" 
                      onChange={this.inputChange.bind(this)} 
                      onKeyUp={this.enterInput.bind(this)}
                      value={this.state.searchContent}/>
                  <span className="icon-delete search-icon-clear" 
                        style={{display: this.state.searchContent.length > 0 ? '' : 'none'}}
                        onClick={this.deleteSearchBoxContent.bind(this)}></span>
                  <span className="icon-search search-top-icon"></span>
                </div>
              </div>
              <div className="search-hot-and-history" style={{display: this.state.searchContent.length === 0 ? '' : 'none'}}>
                <div className="search-hot">
                  <RecommendTitle title={'热门搜索'} noMore={'no'} />
                  <div className="search-hot-songs">
                    {
                      this.state.initDone
                      ?
                      this.state.hotkey.map((item,index) =>{
                        return <span className="search-hot-songs-item" key={index} onClick={this.hotKeyClick.bind(this,item.k)}>
                                  {item.k}
                                </span>
                      })
                      :
                      'loading...'
                    }
                  </div>
                </div>
                <div className="search-history">
                  <div className="search-history-title-wrapper">
                    <div className="search-history-title-wrapper-left">
                      <span className="search-history-title-wrapper-left-text">搜索历史</span>
                    </div>
                    <div className="search-history-title-wrapper-right" onClick={this.deleteAllSearchHis.bind(this)}>
                      <i className="icon-delete-all search-history-title-wrapper-right-icon"></i>
                    </div>
                  </div>
                  <div className="search-history-content">
                    {
                      this.props.searchHistory.length === 0
                      ?
                      <p className="search-history-content-item">暂无搜索记录</p>
                      :
                      this.props.searchHistory.map((item,index) =>{
                        return <p key={index} className="search-history-content-item" 
                                  onClick={this.searchHistoryClick.bind(this,item)}>
                                    {item}
                                    <span className="icon-delete delete-item" 
                                        onClick={this.deleteSearchHisItem.bind(this,item)}></span>
                                </p>
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="search-result-wrapper" style={{display: this.state.searchContent.length === 0 ? 'none' : ''}}>
                <TitleColumn titles={['单曲','歌手','专辑','歌单']} columnClick={this.navClick.bind(this)}/>
                <div className="search-result" ref={(searchResult) =>{this.searchResult = searchResult}}>
                  <div className="search-result-scroll" ref={(searchResultScroll) =>{this.searchResultScroll = searchResultScroll}}>
                    <div style={{
                                  display: this.state.currentResult === 'song' ? '' : 'none'
                                }}>
                      {
                        this.state.initDone
                        ?
                        this.state.singerSongs.map((item,index) =>{
                          return <SongInformation song={item} key={index} songIndex={index} playSong={this.addSearchSongToPlayer.bind(this,item)}/>
                        })
                        : 
                        <p>loading songs...</p>
                      }
                    </div>
                    <div style={{
                                  display: this.state.currentResult === 'singer' ? '' : 'none'
                                }}>
                      {
                        this.state.initDone
                        ?
                        this.state.singerSelf.map((item,index) =>{
                          return <SingerSelf singer={item} key={index} singerIndex={index}/>
                        })
                        :
                        <p>loading...singer</p>
                      }
                    </div>
                    <div style={{
                                  display: this.state.currentResult === 'album' ? '' : 'none'
                                }}>
                      {
                        this.state.initDone
                        ?
                        this.state.singerAlbums.map((item,index) =>{
                          return <Album album={item} key={index} albumIndex={index}/>
                        })
                        :
                        <p>loading...album</p>
                      }
                    </div>
                    <div style={{
                                  display: this.state.currentResult === 'playList' ? '' : 'none'
                                }}>
                      {
                        this.state.initDone
                        ?
                        this.state.playList.map((item,index) =>{
                          return <PlayList playList={item} key={index} playListIndex={index}/>
                        })
                        :
                        <p>loading...playList</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

function bindAction(dispatch) {
  return bindActionCreators(searchHistoryActions,dispatch)
}

export default connect(mapState,bindAction)(Search)