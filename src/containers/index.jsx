import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SideBar from '../components/sideBar/index.jsx'
import ProgressBar from '../components/progressBar/index.jsx'
import Comment from '../components/comment/index.jsx'
import Lyric from 'lyric-parser'
import {getSimiSongs} from '../api/getSongDetail.js'
import {getSongLyric,getSongUrl,getSongComment} from '../api/getSongDetail.js'
import {createSongForExploreNewSong} from '../common/js/createSongForExploreNewSong.js'
import {createComment} from '../common/js/comment.js'
import {initScroll} from '../common/js/initBetterScroll.js'
import {playingMode} from '../common/js/config.js'
import {debunce} from '../common/js/util.js'
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
            simiSongs: [],
            currentSongId: 0
        }
    }
    componentWillMount() {
      this.lyric = null
      this.loadingLyric = false
      this.currentLyricLine = 0
      this.simiSongs = []
      this.hotComments = []
      this.newComments = []
      this.commentOffset = 0
      this.totalComments = 0
      this.ifMoreComment = true
    }
    componentDidUpdate() {
      if(this.props.player.playingState) {
        if(!this.loadingLyric && this.props.player.currentSong !== null || this.state.currentSongId !== this.props.player.currentSong.id) {
          this.loadingLyric = true
          if(this.lyric) {
            this.lyric.stop()
            this.lyric = null
          }
          this.setState({
            currentSongId: this.props.player.currentSong.id
          })
          //获取歌曲歌词
          getSongLyric(this.props.player.currentSong.id).then((res) =>{
            if(res.code === 200 && res.lrc.lyric) {
              this.lyric = new Lyric(res.lrc.lyric,({lineNum,txt}) =>{
                  console.log('歌词将要滚动' + lineNum)
                  this.currentLyricLine = lineNum
                  if(lineNum > 5) {
                    console.log("准备滚动歌词" + this.lyricWrapper.children)
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
                    simiSong.push(createSongForExploreNewSong(item))
                  })
                  simiSong.map((item,index) =>{
                    getSongUrl(item.id).then((res) =>{
                        if(res.code === 200) {
                            this.simiSongs[index] = {...item,url: res.data[0].url}
                        }
                    })
                  })
              }
          })
          //获取歌曲的评论
          getSongComment(this.props.player.currentSong.id,10).then((res) =>{
            if(this.hotComments.length > 0 || this.newComments.length  > 0) {
              this.hotComments = []
              this.newComments = []
            }
            if(res.code === 200) {
              console.log(res)
              this.ifMoreComment = res.more
              this.totalComments = res.total
              if(res.hotComments.length > 0) {
                res.hotComments.map((item) =>{
                  this.hotComments.push(createComment(item))
                })
              }
              if(res.comments.length > 0) {
                res.comments.map((item) =>{
                  this.newComments.push(createComment(item))
                })
              }
            }
          })
        }
        this.audio.play()
      }
      if(this.LyricSlider && this.normalPlayerSlider && this.playerComment) {
        this.LyricSlider.refresh()
        this.normalPlayerSlider.refresh()
        this.playerCommentSlider.refresh()
      }
    }
    componentDidMount() {
        this.LyricSlider = initScroll(this.lyricScroll)
        this.normalPlayerSlider = initScroll(this.normalPlayer)
        this.playerCommentSlider = initScroll(this.playerComment)
        this.LyricSlider.on('scroll',debunce(() =>{
          this.normalPlayerSlider.disable()
        },200))
        this.LyricSlider.on('scrollEnd',() =>{
          setTimeout(() =>{
            this.normalPlayerSlider.enable()
            this.normalPlayerSlider.refresh()
            this.playerComment.click()
          },1200)
        })
        this.playerCommentSlider.on('scroll',debunce(() =>{
          this.normalPlayerSlider.disable()
          let playerComment = this.playerComment.getBoundingClientRect().bottom
          let playerCommentScroll = this.playerCommentScroll.getBoundingClientRect().bottom
          if(playerComment - playerCommentScroll > 20) {
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
        },200))
        this.playerCommentSlider.on('scrollEnd',() =>{
          setTimeout(() =>{
            this.normalPlayerSlider.enable()
            this.normalPlayerSlider.refresh()
            this.playerComment.click()
          },1200)
        })
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
      this.setState({
        currentSongId: this.props.player.currentSong.id
      })
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
      
      this.setState({
        currentSongId: this.props.player.currentSong.id
      })
    }
    playing(playingState) {
        if(playingStateId) {
            clearTimeout(playingStateId)
        }
        let playingStateId = setTimeout(() =>{
            if(playingState) {
               this.audio.play()
               this.lyric.togglePlay()
            }else{
               this.audio.pause()
               this.lyric.togglePlay()
            } 
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
        if(this.lyric !== null) {
          this.lyric.seek(0)
        }
      }else {
        this.toNextSong()
      }
    }
    //点击歌曲的进度条，更新歌曲的播放的时间
    updateCurrentSongProgress(percent) {
      let currentTime = this.props.player.currentSong.duration * percent
      console.log()
      this.audio.currentTime = currentTime
      if(!this.props.player.playingState) {
        this.props.setPlayingState(!this.props.player.playingState)
      }
      if(this.lyric !== null) {
        this.lyric.seek(currentTime * 1000)
      }
    }
    //点击切换是否显示主播放器
    toggleFullScreenPlayer() {
      if(this.props.player.playList.length === 0) {
        return 
      }
      if(timeid) {
        clearTimeout(timeid)
      }
      this.normalPlayerWrapper.style.animation = 'playerToggle 0.4s'
      this.miniPlayerAvatar.style.animation = 'miniPlayerAvatarClick 0.8s'
      let timeid = setTimeout(() =>{
      this.normalPlayerWrapper.style.animation = ''
      this.miniPlayerAvatar.style.animation = ''
      },1200)
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
    //双击击当前播放歌曲的相似歌曲，加入当前播放列表
    simiSongDoubleClick(song) {
      this.loadingLyric = false
      this.currentLyricLine = 0
      this.props.addSongToPlayList(song)
      this.props.setCurrentIndex(this.props.player.playList.length-1)
      this.props.setCurrentSong()
      this.props.setPlayingState(true)
    } 
    //单击当前播放歌曲的相似歌曲处理函数
    simiSongClick(index) {
      if(timeid) {
        clearTimeout(timeid)
      }
      this.simiSong.children[index+1].style.animation = 'songClick 0.8s'
      let timeid = setTimeout(() =>{
        this.simiSong.children[index+1].style.animation = ''
      },1200)
    }
    //全局范围内的后退一步
    backStep() {
      window.history.back()
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
                    <div className="nm-sidebar-back-wrapper" onClick={this.backStep.bind(this)}>
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
                    <div className="normal-player-wrapper" 
                         style={{display: this.state.ifFullScreen ? 'block' : 'none'}}
                         ref={(normalPlayerWrapper) =>{this.normalPlayerWrapper=normalPlayerWrapper}}>
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
                            <div className="normal-player-bottom-comment-wrapper">
                              <p className="normal-player-bottom-comment-title">评论({this.totalComments})</p>
                              <div className="normal-player-bottom-comment"
                                   ref={(playerComment) =>{this.playerComment=playerComment}}>
                                <div className="normal-player-bottom-comment-scroll"
                                   ref={(playerCommentScroll) =>{this.playerCommentScroll=playerCommentScroll}}>
                                  <p className="normal-player-bottom-comment-hot">精彩评论</p>
                                  {
                                    this.hotComments.length === 0
                                    ?
                                    <p>暂无评论</p>
                                    :
                                    this.hotComments.map((item,index) =>{
                                      return <Comment comment={item} key={index}/>
                                    })
                                  }
                                  <p className="normal-player-bottom-comment-hot normal-player-bottom-comment-new">最新评论</p>
                                  {
                                    this.newComments.length === 0
                                    ?
                                    <p>暂无评论</p>
                                    :
                                    this.newComments.map((item,index) =>{
                                      return <Comment comment={item} key={index}/>
                                    })
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="normal-player-bottom-simi-wrapper"
                                 ref={(simiSong) =>{this.simiSong=simiSong}}>
                              <p className="normal-player-bottom-simi-title">相似歌曲</p>
                              {
                                this.simiSongs.length > 0 
                                ?
                                this.simiSongs.map((item,index) =>{
                                    return <p className="normal-player-bottom-simi-songinfo" 
                                              key={index}
                                              onDoubleClick={this.simiSongDoubleClick.bind(this,item)}
                                              onClick={this.simiSongClick.bind(this,index)}>
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
                      <div className="mini-player-avatar-wrapper" 
                           onClick={this.toggleFullScreenPlayer.bind(this)}
                           ref={(miniPlayerAvatar) =>{this.miniPlayerAvatar=miniPlayerAvatar}}>
                        <div className={this.state.ifFullScreen ? "mini-player-toggle icon-shrink" : "mini-player-toggle icon-boost"}></div>
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
                        <span className="mini-player-funcs-item mini-player-funcs-list icon-list">
                          <p className="mini-player-funcs-list-count">{this.props.player.playList.length}</p>
                        </span>
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