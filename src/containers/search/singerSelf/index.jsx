import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'

import './style.styl'

class SingerSelf extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    toSingerInfo(id) {
      hashHistory.push('/singerInfo/' + id)
    }
    render() {
      const singer = this.props.singer
      const singerBack= this.props.singerIndex % 2 === 0 ? '#f5f5f5' : ''
        return (
            <div className="singer-self" style={{background: singerBack}} onClick={this.toSingerInfo.bind(this,singer.singeId)}>
              <div className="singer-self-img-wrapper"><img className="singer-self-img" src={singer.picUrl}/></div>
              <p className="singer-self-name">{singer.singerName}({singer.alia})</p>
            </div>
        )
    }
}

export default SingerSelf