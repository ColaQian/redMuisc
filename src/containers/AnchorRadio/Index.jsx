import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

//import './style.styl'

class AnchorRadio extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <h1>this is the AnchorRadio</h1>
        )
    }
}

export default AnchorRadio