import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'

import './style.styl'

class Album extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    toAlbumInfo(id) {
      hashHistory.push('/albumInfo/' + id)
    }
    render() {
      const album = this.props.album
      const back = this.props.albumIndex % 2 === 0 ? '#f5f5f5' : ''
        return (
            <div className="album" style={{background: back}} onClick={this.toAlbumInfo.bind(this,album.albumId)}>
              <div className="album-cover-wrapper">
                <span className="album-cover-back"></span>
                <img className="album-cover-img" src={album.picUrl}/>
              </div>
              <span className="album-name">{album.albumName}</span>
              <span className="album-creator">{album.singerName}</span>
            </div>
        )
    }
}

export default Album