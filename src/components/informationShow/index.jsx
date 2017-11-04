import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {playCountHandle} from '../../common/js/handleCount.js'

import './style.styl'

class InformationShow extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      const info = this.props.info
      const picUrl = this.props.info.creatorPicUrl
        return (
            <div className="info-show-wrapper">
              <div className="info-show">
                <h1 className="info-show-title">{info.name}</h1>
                <div className="info-show-creator">
                  <span style={{background:'url('+ picUrl +')'}} className="info-show-creator-avatar"></span>
                  <span className="info-show-creator-name">{info.creatorName}</span>
                  <span className="info-show-creator-time">{info.createTime} 创建</span>
                </div>
                <div className="info-show-funcs">
                  <span className="info-show-func info-show-func-subscribe">收藏({playCountHandle(info.subscribedCount)})</span>
                  <span className="info-show-func info-show-func-comment">评论({playCountHandle(info.commentCount)})</span>
                  <span className="info-show-func info-show-func-share">分享({playCountHandle(info.shareCount)})</span>
                </div>
                <div className="info-show-tags">
                  <span className="info-show-tag-title">标签:</span>
                  {
                    info.tags.map((item,index) =>{
                      if(index === info.tags.length - 1) {
                        return <span key={index} className="info-show-tag-content">{item}</span>
                      }
                      return <span key={index} className="info-show-tag-content">{item}<i className="line"> / </i></span>
                    })
                  }
                </div>
                <div className="info-show-desc">
                  <span className="info-show-desc-title">介绍:</span><p className="info-show-desc-content">{info.description}</p>
                </div>
              </div>
            </div>
        )
    }
}

export default InformationShow