import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.styl'

class SideItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
      const name = this.props.name
      const icon = this.props.icon
        return (
            <div className="item">
              <i className={icon ? icon + ' itemIcon' : 'itemIcon'}></i>
              <span className="itemName">{name}</span>
            </div>
        )
    }
}

export default SideItem