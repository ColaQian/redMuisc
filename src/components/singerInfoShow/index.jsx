import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {playCountHandle} from '../../common/js/handleCount.js'

import './style.styl'

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
                  <p className="singer-info-show-item singer-info-show-songs">单曲数: <span>{info.songCount}</span></p>
                  <p className="singer-info-show-item singer-info-show-albums">专辑数: <span>{info.albumCount}</span></p>
                  <p className="singer-info-show-item singer-info-show-mv">MV数: <span>{info.mvCount}</span></p>
                </div>
              </div>
            </div>
        )
    }
}

export default SingerInfoShow