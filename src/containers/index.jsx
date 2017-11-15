import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SideBar from '../components/sideBar/index.jsx'
import ProgressBar from '../components/progressBar/index.jsx'
import Lyric from 'lyric-parser'
import {getSimiSongs} from '../api/getSongDetail.js'
import {createSongForExploreNewSong} from '../common/js/createSongForExploreNewSong.js'
import {initScroll} from '../common/js/initBetterScroll.js'
import {getSongLyric} from '../api/getSongDetail.js'
import {playingMode} from '../common/js/config.js'
import {hashHistory} from 'react-router'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as playerActions from '../store/actions/player.js'
import {mapState} from '../store/reducers/mapState.js'

import './style.styl'
class App extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            initDone: true,
            sideItem: ["搜索", "发现音乐", "MV", "个人中心"],
            myMusic: ["最近播放", "我的音乐云盘", "我的电台", "我的收藏"],
            songCurrentTime: '0:00',
            currentSongPercent: 0,
            ifFullScreen: false,
            simiSongs: []
        }
    }
    componentWillMount() {
      this.lyric = null
      this.loadingLyric = false
      this.currentLyricLine = 0
      this.simiSongs = []
    }
   /* componentWillUpdate() {
      if(this.lyric !== null) {
          this.lyric = null
          this.currentLyricLine = 0
      }
    }*/
    componentDidUpdate() {
      if(this.props.player.playingState) {
        if(!this.loadingLyric && this.props.player.currentSong !== null) {
          this.loadingLyric = true
          if(this.lyric) {
            this.lyric.stop()
            this.lyric = null
          }
          getSongLyric(this.props.player.currentSong.id).then((res) =>{
            if(res.code === 200 && res.lrc.lyric) {
              this.lyric = new Lyric(res.lrc.lyric,({lineNum,txt}) =>{
                  console.log('歌词将要滚动' + lineNum)
                  this.currentLyricLine = lineNum
                  if(lineNum > 5) {
                    console.log("准备盾冬歌词" + this.lyricWrapper.children)
                    let lineEl = this.lyricWrapper.children[lineNum-5]
                    this.LyricSlider.scrollToElement(lineEl,1000)
                  }else{
                    this.LyricSlider.scrollTo(0,0,1000)
                  }
              })
              this.lyric.play()
              console.log(this.lyric)
            }
          })
          //获取当前播放歌曲的相似歌曲
          getSimiSongs(this.props.player.currentSong.id).then((res) =>{
              if(res.code === 200) {
                  console.log("相似歌曲已经找到")
                  if(res.songs.length === 0) {
                      console.log("没有找到相似歌曲")
                      return
                  }
                  let simiSong = []
                  res.songs.map((item) =>{
                      simiSong.push({...createSongForExploreNewSong(item),url: item.mp3Url})
                  })
                  console.log("相似歌曲已经加载")
                  this.simiSongs = simiSong
              }
          })
        }
        this.audio.play()
      }
      if(this.LyricSlider && this.normalPlayerSlider) {
        this.LyricSlider.refresh()
        this.normalPlayerSlider.refresh()
      }
    }
    componentDidMount() {
        this.LyricSlider = initScroll(this.lyricScroll)
        this.normalPlayerSlider = initScroll(this.normalPlayer)
    }
    //切换到上一曲
    toPreSong() {
      this.loadingLyric = false
      this.currentLyricLine = 0
      if(this.props.player.currentIndex === 0) {
        this.props.setCurrentIndex(this.props.player.playList.length - 1)
        this.props.setCurrentSong()
        if(this.props.player.playingState === false) {
            this.props.setPlayingState(true)
        }
        return 
      }
      this.props.setCurrentIndex(this.props.player.currentIndex - 1)
      this.props.setCurrentSong()
      if(this.props.player.playingState === false) {
        this.props.setPlayingState(true)
      }
    }
    //切换歌曲的播放状态(暂停/播放)
    togglePlayingState() {
        if(this.props.player.playList.length === 0) {
            alert("播放列表里并没有歌曲哦！请先选择歌曲")
            return
        }
        let nextPlayingState = !this.props.player.playingState
        this.playing(nextPlayingState)
        this.props.setPlayingState(nextPlayingState)
    }
    //切换到下一曲
    toNextSong() {
        this.loadingLyric = false
        this.currentLyricLine = 0
        if(this.props.player.currentIndex === this.props.player.playList.length - 1) {
            this.props.setCurrentIndex(0)
            this.props.setCurrentSong()
            if(this.props.player.playingState === false) {
                this.props.setPlayingState(true)
            }
            return 
        }
        this.props.setCurrentIndex(this.props.player.currentIndex + 1)
        this.props.setCurrentSong()
        if(this.props.player.playingState === false) {
            this.props.setPlayingState(true)
        }
    }
    playing(playingState) {
        if(playingStateId) {
            clearTimeout(playingStateId)
        }
        let playingStateId = setTimeout(() =>{
            playingState ? this.audio.play() : this.audio.pause()
        },20)
    }
    //将歌曲的时间由秒转化为mm:ss格式
    handlePlayTime(time) {
        let intTime = parseInt(time)
        let min = intTime / 60 | 0
        let sec = this._handleSecond(intTime % 60)
        return `${min}:${sec}`
    }
    //处理歌曲的秒数函数
    _handleSecond(sec) {
        let initSec = sec.toString()
        if(initSec.length < 2) {
            return '0' + initSec
        }
        return sec
    }
    //歌曲当前的播放时间进度更新
    handleSongTimeUpdate(e) {
        let currentTime = this.handlePlayTime(e.target.currentTime)
        this.setState({
            songCurrentTime: currentTime
        })
        this.setState({
            currentSongPercent: parseInt(e.target.currentTime)/this.props.player.currentSong.duration
        })
    }
    //切换歌曲播放模式(单曲循环/列表循环)
    togglePlayingMode() {
        if(this.props.player.playingMode === playingMode.loopList) {
            this.props.setPlayingMode(playingMode.loop)
        }else {
            this.props.setPlayingMode(playingMode.loopList)
        }
    }
    //监听歌曲播放结束的操作
    handleSongEnded() {
        if(this.props.player.playingMode === playingMode.loop) {
            this.audio.currentTime = 0
            this.audio.play()
        }else {
            this.toNextSong()
        }
    }
    //点击歌曲的进度条，更新歌曲的播放的时间
    updateCurrentSongProgress(percent) {
        let currentTime = this.props.player.currentSong.duration * percent
        this.audio.currentTime = currentTime
        if(!this.props.player.playingState) {
            this.props.setPlayingState(!this.props.player.playingState)
        }
    }
    //点击切换是否显示主播放器
    toggleFullScreenPlayer() {
      this.setState({
        ifFullScreen: !this.state.ifFullScreen
      })
    }
    //点击主播放器上的专辑名称,转到相应的专辑页面
    normalPlayerToAlbumInfo() {
        this.setState({
            ifFullScreen: false
        })
      hashHistory.push('/albumInfo/' + this.props.player.currentSong.album.id)
    }
    //点击主播放器的歌手名称,转到相应的歌手详情页面
    normalPlayerToSingerInfo() {
      this.setState({
        ifFullScreen: false
      })
      hashHistory.push('/singerInfo/' + this.props.player.currentSong.singer.id)
    }
    render() {
        const sideItem = this.state.sideItem
        const myMusic = this.state.myMusic
        const currentSong = this.props.player.currentSong
        let songUrl = ''
        let picUrl = ''
        let songName = ''
        let singerName = ''
        let playList = []
        let duration = '0:00'
        let albumName = ''
        if(currentSong !== null) {
            songUrl = currentSong.url
            songName = currentSong.name
            singerName = currentSong.singer.name
            albumName = currentSong.album.name
            playList = currentSong
            duration = this.handlePlayTime(currentSong.duration)
            picUrl = currentSong.album.picUrl
        }
        return (
            <div className="nm-music">
                <div className="nm-sidebar">
                    <div className="nm-sidebar-back-wrapper">
                        <span className="nm-sidebar-back">back</span>
                    </div>
                    <SideBar sideItem={sideItem} sideTitle="发现"/>
                    <SideBar sideItem={myMusic} sideTitle="我的音乐"/>
                </div>
                <div className="nm-main">
                    {   
                        this.state.initDone
                        ? this.props.children
                        : "正在加载中"
                    }
                </div>
                <div className="nm-player">
                    <div className="normal-player-wrapper" style={{display: this.state.ifFullScreen ? 'block' : 'none'}}>
                      <div className="normal-player-background" style={{background:'url('+ picUrl +')'}}></div>
                      <div className="normal-player-background2"></div>
                      <div className="normal-player" ref={(normalPlayer) =>{this.normalPlayer=normalPlayer}}>
                        <div className="normal-player-scroll">
                          <div className="normal-player-top">
                            <div className="normal-player-top-left">
                              <div className={this.props.player.playingState ? 'avatar-out-cover' : 'avatar-out-cover avatar-out-cover-pause'}>
                                <div className="avatar-middle-cover">
                                  <div className="avatar-in-cover">
                                    <img src={picUrl === null ? '../common/images/timg.jpg' : picUrl} className="normal-player-avatar"/>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="normal-player-top-right">
                              <div className="normal-player-top-right-songinfo">
                                <p className="normal-player-top-right-songinfo-name">{songName}</p>
                                <p className="normal-player-top-right-songinfo-alandsin">专辑:&nbsp;
                                  <span className="normal-player-top-right-songinfo-alandsin-detail" onClick={this.normalPlayerToAlbumInfo.bind(this)}>{albumName}</span>
                                </p>
                                <p className="normal-player-top-right-songinfo-alandsin">歌手:&nbsp;
                                  <span className="normal-player-top-right-songinfo-alandsin-detail" onClick={this.normalPlayerToSingerInfo.bind(this)}>{singerName}</span>
                                </p>
                              </div>
                              <div className="normal-player-top-right-lyric">
                                <div className="normal-player-top-right-lyric-scroll"
                                     ref={(lyricScroll) =>{this.lyricScroll=lyricScroll}}>
                                   <div className="lyric-wrapper" ref={(lyricWrapper) =>{this.lyricWrapper=lyricWrapper}}>
                                     {
                                        this.lyric === null 
                                        ?
                                        "暂无歌词"
                                        :
                                        this.lyric.lines.map((item,index) =>{
                                            return <p ref={(lyricLine) =>{this.lyricLine=lyricLine}} 
                                                      key = {index}
                                                      className={this.currentLyricLine === index ? 'lyric-wrapper-current-item lyric-wrapper-item' : 'lyric-wrapper-item'}>
                                                      {item.txt}</p>
                                        })
                                     }
                                   </div> 
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="normal-player-bottom">
                            <div className="normal-player-bottom-comment-wrapper"></div>
                            <div className="normal-player-bottom-simi-wrapper">
                              <p className="normal-player-bottom-simi-title">相似歌曲</p>
                              {
                                this.simiSongs.length > 0 
                                ?
                                this.simiSongs.map((item,index) =>{
                                    return <p className="normal-player-bottom-simi-songinfo" key={index}>
                                                <span className="normal-player-bottom-simi-item normal-player-bottom-simi-song">{item.name}</span>
                                                <span className="normal-player-bottom-simi-item normal-player-bottom-simi-singer">{item.singer.name}</span>
                                            </p>
                                })
                                :
                                <p>暂无相似歌曲</p>
                              } 
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mini-player">
                    <div className="mini-player-line"></div>
                      <div className="mini-player-avatar-wrapper" onClick={this.toggleFullScreenPlayer.bind(this)}>
                        <div className="mini-player-toggle icon-boost"></div>
                        <img src={picUrl === null ? '../common/images/timg.jpg' : picUrl} className="mini-player-avatar"/>
                      </div> 
                      <div className="mini-player-play-wrapper">
                        <span className="mini-player-play-item mini-player-play-presong icon-presong"
                              onClick={this.toPreSong.bind(this)}></span>
                        <span className={this.props.player.playingState ? "mini-player-play-item mini-player-play-toggle icon-pause" : "mini-player-play-item mini-player-play-toggle icon-play"}
                               onClick={this.togglePlayingState.bind(this)}></span>
                        <span className="mini-player-play-item mini-player-play-next icon-nextsong"
                            onClick={this.toNextSong.bind(this)}></span>
                      </div>  
                      <div className="mini-player-songinfo-progress">
                        <div className="mini-player-songinfo">
                          <p className="mini-player-songinfo-name">{songName}&nbsp;-&nbsp;<span className="mini-player-songinfo-singer">{singerName}</span></p>
                          <p className="mini-player-songinfo-time">{this.state.songCurrentTime}&nbsp;/&nbsp;{duration}</p>
                        </div>
                        <div className="mini-player-progress">
                          <ProgressBar updateCurrentSongProgress={this.updateCurrentSongProgress.bind(this)}
                                       currentSongPercent={this.state.currentSongPercent}/>
                        </div>
                      </div>
                      <div className="mini-player-funcs">
                        <span className="mini-player-funcs-item icon-fond"></span>
                        <span className={this.props.player.playingMode === playingMode.loopList ? "mini-player-funcs-item icon-looplist" : 'mini-player-funcs-item icon-loopone'}
                              onClick={this.togglePlayingMode.bind(this)}></span>
                        <span className="mini-player-funcs-item icon-voice"></span>
                        <span className="mini-player-funcs-item icon-list"></span>
                      </div>
                    </div>
                </div>
                <audio ref={(audio) =>{this.audio=audio}} 
                    src={songUrl}
                    onTimeUpdate={this.handleSongTimeUpdate.bind(this)}
                    onEnded={this.handleSongEnded.bind(this)}
                    >
                </audio>
            </div>
        )
    }
}

function bindAction(dispatch) {
  return bindActionCreators(playerActions, dispatch)
}
export default connect(mapState, bindAction)(App)