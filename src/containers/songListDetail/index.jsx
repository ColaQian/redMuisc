import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import BigTitle from '../../components/bigTitle/index.jsx'
import AvatarInfo from '../../components/avatarInfo/index.jsx'
import InformationShow from '../../components/informationShow/index.jsx'
import SongInfo from '../../components/songInfo/index.jsx'
import PlayAll from '../../components/playAll/index.jsx'
import {initScroll} from '../../common/js/initBetterScroll.js'
import {getPlayListDetail} from '../../api/getSongList.js'
import {playListDetail} from '../../common/js/createPlaylist.js'
import {getSongDetail,getSongUrl} from '../../api/getSongDetail.js'
import {createSong} from '../../common/js/createSong.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as playerActions from '../../store/actions/player.js'
import {mapState} from '../../store/reducers/mapState.js'

import './style.styl'

class SongListDetail extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
          songListInfo: null,
          songs: [],
          initDone: false
        }
    }
    componentWillMount() {
      this.completeSongs = []
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.slider) {
        this.slider.refresh()
      } 
    }
    componentDidMount() {
      this._initSongList()
      setTimeout(() =>{
        this._initSlider()
      },20)
    }
    _initSlider() {
      this.slider = initScroll(this.songListContent)
    }
    _initSongList() {
      const id = this.props.params.id
      let playList = null
      getPlayListDetail(id).then((res) =>{
        if(res.code === 200) {
          console.log(res)
          playList = playListDetail(res.playlist)
          this.setState({
            songListInfo: playList,
            songs: playList.songIds,
            initDone: true 
          })
        }
        playList.songIds.forEach((item,index) =>{
            getSongUrl(item.id).then((res) =>{
              if(res.code === 200) {
                this.completeSongs[index] = {...item,url: res.data[0].url}
              }
            })
        })
      })
    }
    addSongsToPlayer(index) {
      if(this.completeSongs.length !== this.state.songs.length) {
        alert("歌曲正在加载，请稍后尝试")
        return 
      }
      if(this.state.songs.length === this.props.player.playList.length || this.state.songs.length === 0) {
        this.props.setCurrentIndex(index)
        this.props.setCurrentSong()
        this.props.setPlayingState(true)
        return
      }
      this.props.setPlayList(this.completeSongs)
      this.props.setCurrentIndex(index)
      this.props.setCurrentSong()
      this.props.setPlayingState(true)
    }
    render() {
      let songListInfo = this.state.songListInfo
      let picUrl = ''
      if(this.state.songListInfo !== null) {
        picUrl = this.state.songListInfo.picUrl
      }
      //这是个很重要的问题,render的时候songListInfo的为null，不可能有picUrl这个属性,直接去访问他
      //会直接报错，不为null也不是undefined，因为他根本不存在
      //let picUrl = this.state.songListInfo.picUrl !== undefined ? "this.state.songListInfo.picUrl" : ''
        return (
          <div className="song-list-detail-wrapper">
            <div className="song-list-detail-background" style={{background:'url('+ picUrl +')'}}></div>
            <div className="song-list-detail-background2"></div>
            <div className="song-list-detail">
              <BigTitle title="歌单"/>
              <div className="song-list-info">
                <div className="song-list-info-avatar">
                  {
                    this.state.initDone
                    ? <AvatarInfo avatarInfo={{...songListInfo,songIds: null}} width="200" nameShow="lala"/>
                    : "loading..."
                  }
                </div>
                <div className="song-list-info-desc">
                  {
                    this.state.initDone
                    ? <InformationShow info={{...songListInfo,songIds: null}}/>
                    : "loading..."
                  }
                </div>
              </div>
              <PlayAll count={this.state.songs.length}/>
              <div className="song-list-content-wrapper" ref={(songListContent) =>{this.songListContent=songListContent}}>
                <div className="song-list-content">
                  {
                    this.state.songs.map((item,index) =>{
                      return <SongInfo key={index} song={item} num={index} playSong={this.addSongsToPlayer.bind(this,index)}/>
                    })
                  }
                </div>
              </div>
            </div>
          </div>  
        )
    }
}
function bindAction(dispatch) {
  return bindActionCreators(playerActions,dispatch)
}
export default connect(mapState,bindAction)(SongListDetail)