import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'

class TitleColumn extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            currentItem: this.props.titles[0]
        }
    }
    handleColumnItemClick(item) {
        this.props.columnClick(item)
        this.setState({
           currentItem: item 
        })
    }
    render() {
        return (
            <div className="main-column">
                  {
                    this.props.titles.map((item,index) =>{
                      return <span key={index} className={this.state.currentItem === item ? "column-item column-item-selected" : "column-item"} 
                                onClick={this.handleColumnItemClick.bind(this,item)}>{item}</span>
                    })
                  }
            </div>
        )
    }
}

export default TitleColumn