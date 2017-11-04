import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl' 

class AlbumDescInfo extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      const info = this.props.info
        return (
           <div className="album-desc-wrapper">
              <div className="album-desc">
                <h1 className="album-desc-title">{info.name}</h1>
                <div className="album-desc-creator">
                  <span className="album-desc-creator-name">歌手:&nbsp;&nbsp;&nbsp;{info.creatorName}</span>
                  <span className="album-desc-creator-time">发行时间:&nbsp;&nbsp;&nbsp;{info.publishTime}</span>
                </div>
                {/*<div className="info-show-funcs">
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
                </div>*/}
                <div className="album-desc-desc">
                  <span className="album-desc-desc-title">介绍:</span><p className="album-desc-desc-content">{info.desc}</p>
                </div>
              </div>
            </div>
        )
    }
}

export default AlbumDescInfo