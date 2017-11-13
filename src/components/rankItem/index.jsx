import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getRank} from '../../api/getRank.js'
import {hashHistory} from 'react-router'
import {playListDetailForRank} from '../../common/js/createPlaylistForRank.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as rankInfoActions from '../../store/actions/rankInfo.js' 
import {mapState} from '../../store/reducers/mapState.js'

import './style.styl'

class RankItem extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
          songs: [],
          picUrl: null,
          initDone: false,
          totalSongs: [],
          listInfo: null,
          id: 0
        }
    }
    componentWillMount() {
      this.rankItemTop = ['rank-item-top']
      this.rankItemMiddle = ['']
      this.rankItemBottom = ['rank-item-bottom']
    }
    componentDidMount() {
      this._filterType(this.props.rankType)
    }
    rankClick() {
      const id = this.state.id
      this.props.setRankBaseInfo(this.state.listInfo)
      this.props.setRankSongs(this.state.totalSongs)
      hashHistory.push('/rankDetail/' + id)
    }
    _filterType(item) {
      switch(this.props.rankType){
        case '飙升榜':
          this.rankItemTop.push('top-super-raise')
          this.rankItemBottom.push('bottom-super-raise')
          getRank(3).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                //由于返回的结果里面没有歌曲的播放url，需要重新发送请求歌曲的地址，需要大量的时间，会导致页面
                //的加载变得缓慢，在这里可以暂时先不考虑获取，
                //可以在进入详情页面后，歌曲列表显示出来，在发送请求获取歌曲的播放地址
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break
        
        case '新歌榜': 
          this.rankItemTop.push('top-new-songs')
          this.rankItemBottom.push('bottom-new-songs')
          getRank(0).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break
        
        case '热歌榜':
          this.rankItemTop.push('top-hot-songs')
          this.rankItemBottom.push('bottom-new-songs')
          getRank(1).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break
        
        case '原创榜': 
          this.rankItemTop.push('top-origin-songs')
          this.rankItemBottom.push('bottom-origin-songs')
          getRank(2).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break

        case '云音乐电音榜': 
          this.rankItemTop.push('top-denon-songs')
          this.rankItemBottom.push('bottom-denon-songs')
          getRank(4).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break

        case 'Billboard周榜': 
          this.rankItemTop.push('top-billboard-songs')
          this.rankItemBottom.push('bottom-denon-songs')
          getRank(6).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break
    
        case 'UK排行榜周榜': 
          this.rankItemTop.push('top-uk-songs')
          this.rankItemBottom.push('bottom-denon-songs')
          getRank(5).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break

        case 'iTunes榜': 
          this.rankItemTop.push('top-itune-songs')
          this.rankItemBottom.push('bottom-denon-songs')
          getRank(8).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break
        
        case '日本Oricon周榜': 
          this.rankItemTop.push('top-oricon-songs')
          this.rankItemBottom.push('bottom-denon-songs')
          getRank(10).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break

        case '台湾Hito排行榜': 
          this.rankItemTop.push('top-hito-songs')
          this.rankItemBottom.push('bottom-denon-songs')
          getRank(20).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break

        case '韩国Melon排行榜': 
          this.rankItemTop.push('top-melon-songs')
          this.rankItemBottom.push('bottom-denon-songs')
          getRank(11).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break

        case '华语金曲榜': 
          this.rankItemTop.push('top-gold-songs')
          this.rankItemBottom.push('bottom-denon-songs')
          getRank(17).then((res) =>{
            let ret = []
            let id = 0
            let pic = null
            let listInfo = null
            let songs = []
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic,
                id: id
              })
                listInfo = playListDetailForRank(res.result)
                this.setState({
                  totalSongs: listInfo.songIds,
                  listInfo: {...listInfo,songIds: null}
                })
            }
          })
          break
        default: 
          console.log('没有匹配的')
      }
    }
    render() {
        return (
            <div className="rank-item" onClick={this.rankClick.bind(this)}>
              <div className={this.rankItemTop.join(' ')}>
                <span className="rank-item-top-desc">{this.props.rankType}</span>
              </div>
              <div className='rank-item-middle'>
                <div className="rank-item-middle-content">
                  {
                    this.state.initDone
                    ?
                    this.state.songs.map((item,index) =>{
                      return <span className="rank-item-middle-content-item" key={index}>{index+1}.{item.name}-{item.singerName}</span>
                    })
                    :
                    '加载中...'
                  }
                </div>
              </div>
              <div className={this.rankItemBottom.join(' ')} style={{backgroundImage: 'url(' + this.state.picUrl +')'}}></div>
            </div>
        )
    }
}

function bindAction(dispatch) {
  return bindActionCreators(rankInfoActions,dispatch)
}
export default connect(mapState,bindAction)(RankItem)