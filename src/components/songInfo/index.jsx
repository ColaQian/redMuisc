import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'

class SongInfo extends React.Component {
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
    render() {
      const song = this.props.song
      const num = this.props.num
      let back = num % 2 === 1 ? '' : '#f5f5f5'
        return (
            <div className="song-information" style={{background: back}}>
              <span className="song-information-item song-information-index">{this.handleIndex(num)}</span>
              <span className="song-information-item song-information-iflove">m</span>
              <span className="song-information-item song-information-name">{song.name}</span>
              <span className="song-information-item song-information-singer">{song.singer.name}</span>
              <span className="song-information-item song-information-album">{song.album.name}</span>
              <span className="song-information-item song-information-ifhigh">{song.ifHighQuality}</span>
            </div>
        )
    }
}

export default SongInfo