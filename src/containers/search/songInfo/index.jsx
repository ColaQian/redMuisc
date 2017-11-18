import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {handlePlayTime} from '../../../common/js/handleDuration.js'

import './style.styl'

class SongInformation extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    songClick() {
      if(timeId) {
        clearTimeout(timeId)
      }
      this.songItem.style.animation = 'songClick 0.6s'
      let timeId = setTimeout(() =>{
        this.songItem.style.animation = ''
      },1200)
    }
    songDoubleClick() {
      this.props.playSong()
    }
    render() {
      const song = this.props.song
      const back = this.props.songIndex % 2 === 0 ? '#f5f5f5' : ''
        return (
            <div className="song" 
                 style={{background: back}}
                 ref={(songItem) =>{this.songItem=songItem}}
                 onClick={this.songClick.bind(this)}
                 onDoubleClick={this.songDoubleClick.bind(this)}>
              <span className="song-item song-name">{song.name}</span>
              <span className="song-item song-singer">{song.singer.name}</span>
              <span className="song-item song-album">{song.album.name}</span>
              <span className="song-item song-duration">{handlePlayTime(song.duration)}</span>
            </div>
        )
    }
}

export default SongInformation