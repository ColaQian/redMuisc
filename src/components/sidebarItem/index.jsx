import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'
import './style.styl'

class SideItem extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    componentWillMount() {
      this.nameList = {
        '搜索':'search',
        '发现音乐': 'find'
      }
    }
    itemClick(name) {
     hashHistory.push('/'+this.nameList[name])
    }
    render() {
      const name = this.props.name
      const icon = this.props.icon
        return (
            <div className="item">
              <p className="item-name" onClick={this.itemClick.bind(this,name)}>
                <i className={icon ? icon + ' item-icon' : 'item-icon'}></i>{name}
              </p>
            </div>
        )
    }
}

export default SideItem