import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'

class SongInformation extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      const song = this.props.song
      const back = this.props.songIndex % 2 === 0 ? '#f5f5f5' : ''
        return (
            <div className="song" style={{background: back}}>
              <span className="song-item song-name">{song.songName}</span>
              <span className="song-item song-singer">{song.singerName}</span>
              <span className="song-item song-album">{song.albumName}</span>
            </div>
        )
    }
}

export default SongInformation