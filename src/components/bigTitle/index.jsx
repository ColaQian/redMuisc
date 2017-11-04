import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'

class BigTitle extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
        return (
            <h1 className="title">{this.props.title}</h1>
        )
    }
}

export default BigTitle