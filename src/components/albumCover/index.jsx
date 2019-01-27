import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'

class AlbumCover extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    handleCoverClick() {
      this.props.albumClick()
    }
    render() {
      let album = this.props.album
        return (
            <div className="album-cover">
              <div className="album-cover-top" onClick={this.handleCoverClick.bind(this)}>
                <span className="album-cover-top-back"></span>
                <img src={album.picUrl} className="album-cover-top-img"/>
              </div>
              <div className="album-cover-bottom">
                <p className="album-cover-bottom-name">{album.name}</p>
                {
                  this.props.showCreator
                  ? <span className="album-cover-bottom-time">{album.creatorName}</span>
                  : <span className="album-cover-bottom-time">{album.publishTime}</span>
                }
                
              </div>
            </div>
        )
    }
}

export default AlbumCover