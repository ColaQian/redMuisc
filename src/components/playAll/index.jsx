import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'
import './icon.styl'

class PlayAll extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
        return (
             <div className="playall">
                <span className="playall-btn"><i className="icon-playAll"></i>播放全部({this.props.count})</span>
            </div>
        )
    }
}

export default PlayAll 