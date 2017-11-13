import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SideBar from '../components/sideBar/index.jsx'
import ProgressBar from '../components/progressBar/index.jsx'
import {playingMode} from '../common/js/config.js'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as playerActions from '../store/actions/player.js'
import {mapState} from '../store/reducers/mapState.js'

import './style.styl'
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: true,
            sideItem: ["搜索", "发现音乐", "MV", "个人中心"],
            myMusic: ["最近播放", "我的音乐云盘", "我的电台", "我的收藏"],
            songCurrentTime: '0:00',
            currentSongPercent: 0
        }
    }
    componentDidUpdate() {
        if(this.props.player.playingState) {
            this.audio.play()
        }
    }
    //切换到上一曲
    toPreSong() {
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
        if(currentSong !== undefined) {
            songUrl = currentSong.url
            songName = currentSong.name
            singerName = currentSong.singer.name
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
                    <div className="normal-player">
                        
                    </div>
                    <div className="mini-player">
                    <div className="mini-player-line"></div>
                      <div className="mini-player-avatar-wrapper">
                        <div className="mini-player-toggle"></div>
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