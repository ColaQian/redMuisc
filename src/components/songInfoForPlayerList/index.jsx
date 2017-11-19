import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as playerActions from '../../store/actions/player.js'
import {mapState} from '../../store/reducers/mapState.js'

import './style.styl'

class SongInfoForPlayer extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    handleIndex(num) {
      num = num + 1
      let newNum = num.toString()
      if(newNum.length > 1) {
        return newNum
      }
      return '0' + newNum
    }
    songInfoClick() {
      if(timeid) {
        clearTimeout(timeid)
      }
      this.songInformation.style.animation = 'songClick 0.8s'
      let timeid = setTimeout(() =>{
        this.songInformation.style.animation = ''
      },1200)
    }
    songInfoDoubleClick() {
      this.props.playSong()
    }
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
    render() {
      const song = this.props.song
      const num = this.props.num
      let back = num % 2 === 1 ? '' : '#f5f5f5'
      let playingColor = this.props.player.currentSong !== null && this.props.player.currentSong.id === song.id ? '#f04134' : ''
        return (
            <div className="song-information" 
                style={{background: back, color: playingColor}} 
                onClick={this.songInfoClick.bind(this)}
                onDoubleClick={this.songInfoDoubleClick.bind(this)}
                ref={(songInformation) =>{this.songInformation=songInformation}}>
              {
                this.props.player.currentSong !== null && this.props.player.currentSong.id === song.id
                ?
                <span className="song-information-item song-information-index icon-on-playing"></span>
                :
                <span className="song-information-item song-information-index"></span>
              }
              <span className="song-information-item song-information-name"
                    style={{color: playingColor}}>{song.name}</span>
              <span className="song-information-item song-information-singer"
                    style={{color: playingColor}}>{song.singer.name}</span>
              <span className="song-information-item song-information-duration"
                    style={{color: playingColor}}>{this.handlePlayTime(song.duration)}</span>
            </div>
        )
    }
}
function bindAction() {
  return {}
}
export default connect(mapState,bindAction)(SongInfoForPlayer)