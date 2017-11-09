import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'

class RecommendTitle extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      const title = this.props.title
      const iconClass = this.props.iconClass
      let ifShowMore = ''
      if(this.props.noMore) {
        ifShowMore = 'none'
      }
        return (
            <div className="recommend-title-wrapper">
              <div className="recommend-title-wrapper-left">
                <i className={iconClass ? iconClass : ''}></i>
                <span className="recommend-title-wrapper-left-text">{title}</span>
              </div>
              <div className="recommend-title-wrapper-right" style={{display: ifShowMore}}>
                <span className="recommend-title-wrapper-right-text">更多&nbsp;></span>
                <i></i>
              </div>
            </div>
        )
    }
}

export default RecommendTitle