import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {playCountHandle} from '../../common/js/handleCount.js'

import './style.styl'
import './icon.styl'

class SingerInfoShow extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      const info = this.props.info
        return (
            <div className="singer-info-show-wrapper">
              <div className="singer-info-show">
                <h1 className="singer-info-show-name">{info.name}</h1>
                <div className="singer-info-show-content">
                  <p className="singer-info-show-item singer-info-show-songs"><i className="icon-muisc"></i>单曲数: <span className="singer-info-show-item-i">{info.songCount}</span></p>
                  <p className="singer-info-show-item singer-info-show-albums"><i className="icon-album"></i>专辑数: <span className="singer-info-show-item-i">{info.albumCount}</span></p>
                  <p className="singer-info-show-item singer-info-show-mv"><i className="icon-mv"></i>MV数: <span className="singer-info-show-item-i">{info.mvCount}</span></p>
                </div>
              </div>
            </div>
        )
    }
}

export default SingerInfoShow