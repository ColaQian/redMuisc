import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import BScroll from 'better-scroll'
import AvatarInfo from '../../components/avatarInfo/index.jsx'
import SongInfo from '../../components/songInfo/index.jsx'
import BigTitle from '../../components/bigTitle/index.jsx'
import PlayAll from '../../components/playAll/index.jsx'
import AlbumDescInfo from '../../components/albumDescInfo/index.jsx'
import {createAlbum} from '../../common/js/createAlbum.js'
import {createSong} from '../../common/js/createSong.js'
import {getAlbumInfo} from '../../api/getAlbumInfo.js'
import {getSongUrl} from '../../api/getSongDetail.js'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as playerActions from '../../store/actions/player.js'
import {mapState} from '../../store/reducers/mapState.js'

import './style.styl'

class AlbumInfo extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
          albumInfo: null,
          albumSongs: [],
          initDone: false
        }
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.slider) {
        this.slider.refresh()
      } 
    }
    componentWillMount() {
      this.completeSongs = []
    }
    componentDidMount() {
      this._initAlbumInfo()
      setTimeout(() =>{
        this._initSlider()
      },20)
    }
    _initSlider() {
      this.slider = new BScroll(this.albumContent,{
        probeType: 2,
        click: true
      })
    }
    _initAlbumInfo() {
      const id = this.props.params.id
      getAlbumInfo(id).then((res) =>{
        if(res.code === 200) {
          let albumInfo = null
          let songs = []
          //获取专辑的基本信息(封面，歌手，名称，介绍，发行时间等)
          albumInfo = createAlbum(res.album)
          this.setState({
            albumInfo: albumInfo,
            initDone: true
          })
          //获取专辑内的歌曲
          res.songs.forEach((item) =>{
            //tip: 因为现在只需要获取到歌曲的基本信息,获取的歌曲的播放URL需要重新请求数据,而setState(albumSongs)可能在完全获取到
            //     歌曲的播放URL就已经设置完毕，这样会导致页面上会显不出来歌曲的信息，因为此时state里的albumSongs为空
            //     可以考虑在点击歌曲让其播放的时候再去获取播放URL
            /*getSongUrl(item.id).then((res) =>{
              if(res.code === 200) {
                console.log("歌曲的URL已经取到")
                songs.push({...createSong(item),url: res.data[0].url})
              }
            })*/
            songs.push(createSong(item))
          })
          
          //将获取的专辑基本信息，歌曲放在状态里
          setTimeout(() =>{
            this.setState({
              albumSongs: songs
            })
          },500)
          songs.map((item,index) =>{
            getSongUrl(item.id).then((res) =>{
              if(res.code === 200) {
                this.completeSongs[index] = {...item,url: res.data[0].url}
              }
            })
          })          
        }
      })
    }
    //将专辑的歌曲加入redux的歌曲播放列表
    addAlbumToPLayer(index) {
      /*if(this.state.albumSongs.length === this.props.player.playList.length || this.state.albumSongs.length === 0) {
        this.props.setCurrentIndex(index)
        this.props.setCurrentSong()
        this.props.setPlayingState(true)
        return
      }
      this.props.setPlayList(this.completeSongs)
      this.props.setCurrentIndex(index)
      this.props.setCurrentSong()
      this.props.setPlayingState(true)*/

      if(this.props.player.currentIndex < 0 || this.props.player.playList[0].id !== this.state.albumSongs[0].id) {
        this.props.setPlayList(this.completeSongs)
      }
      this.props.setCurrentIndex(index)
      this.props.setCurrentSong()
      this.props.setPlayingState(true)
    }
    render() {
      let albumInfo = this.state.albumInfo
      let albumSongs = this.state.albumSongs
      let picUrl = ''
      if(this.state.albumInfo !== null) {
        picUrl = this.state.albumInfo.picUrl
      }
      //这是个很重要的问题,render的时候songListInfo的为null，不可能有picUrl这个属性,直接去访问他
      //会直接报错，不为null也不是undefined，因为他根本不存在
      //let picUrl = this.state.songListInfo.picUrl !== undefined ? "this.state.songListInfo.picUrl" : ''
        return (
          <div className="album-info-wrapper">
            <div className="album-info-background" style={{background:'url('+ picUrl +')'}}></div>
            <div className="album-info-background2"></div>
            <div className="album-info">
              <BigTitle title="专辑"/>
              <div className="song-list-info">
                <div className="song-list-info-avatar">
                  {
                    this.state.initDone
                    ? <AvatarInfo avatarInfo={albumInfo} width="200" nameShow="lala"/>
                    : "loading..."
                  }
                </div>
                <div className="song-list-info-desc">
                  {
                    this.state.initDone
                    ? <AlbumDescInfo info={albumInfo}/>
                    : "loading..."
                  }
                </div>
              </div>
              {/*<div className="album-info-playall">
                <span className="album-info-playall-btn">播放全部({this.state.albumSongs.length})</span>
              </div>*/}
              <PlayAll count={this.state.albumSongs.length}/>
              <div className="album-info-content-wrapper" ref={(albumContent) =>{this.albumContent=albumContent}}>
                <div className="album-info-content">
                  {
                    this.state.initDone 
                    ? this.state.albumSongs.map((item,index) =>{
                          return <SongInfo key={index} song={item} num={index} 
                                           playSong={this.addAlbumToPLayer.bind(this,index)}/>
                        })
                    : <p>加载中...</p>
                  }
                </div>
              </div>
            </div>
          </div>  
        )
    }
}

function bindAction(dispatch) {
  return bindActionCreators(playerActions, dispatch)
}
export default connect(mapState, bindAction)(AlbumInfo)