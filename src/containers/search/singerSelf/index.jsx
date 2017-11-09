import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'

class SingerSelf extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      const singer = this.props.singer
        return (
            <div className="singer-self">
              <div className="singer-self-img-wrapper"><img className="singer-self-img" src={singer.picUrl}/></div>
              <p className="singer-self-name">{singer.singerName}({singer.alia})</p>
            </div>
        )
    }
}

export default SingerSelf