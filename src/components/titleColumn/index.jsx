import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'

class TitleColumn extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    handleColumnItemClick(item) {
        this.props.columnClick(item)
    }
    render() {
        return (
            <div className="main-column">
                  {
                    this.props.titles.map((item,index) =>{
                      return <span key={index} className="column-item" onClick={this.handleColumnItemClick.bind(this,item)}>{item}</span>
                    })
                  }
            </div>
        )
    }
}

export default TitleColumn