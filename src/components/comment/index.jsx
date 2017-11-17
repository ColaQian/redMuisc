import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {formatTime} from '../../common/js/formatTime.js'
import {playCountHandle} from '../../common/js/handleCount.js'

import './style.styl'

class Comment extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    handleCommentTime(time) {
      let dateTime = new Date().getTime()
      if(dateTime - time < 1800000) {
        return '刚刚'
      }else if(formatTime(dateTime) === formatTime(time)) {
        let stringHour = new Date(time).getHours().toString()
        let stringMin = new Date(time).getMinutes().toString()
        let hour = stringHour.length > 1 ? stringHour : '0' + stringHour
        let min = stringMin.length > 1 ? stringMin : '0' + stringMin
        return hour + ':' + min
      }else if(new Date(dateTime).getFullYear() === new Date(time).getFullYear()) {
        return (new Date(time).getMonth() +1) + '-' + new Date(time).getDate()
      }else {
        return formatTime(time)
      }
    }
    render() {
      const comment = this.props.comment
        return (
            <div className="comment-wrapper">
              {
                comment.replied === null
                ?
                <div className="comment">
                  <div className="comment-user-avatar-wrapper">
                    <img className="comment-user-avatar" src={comment.user.picUrl}/>
                  </div>
                  <div className="commcomment-user-avatar-wrpperent-user-info">
                    <p className="comment-user-write-content">
                      <span className="comment-user-write-content-user">{comment.user.name}</span>:&nbsp;{comment.content}
                    </p>
                    <div className="comment-user-other-info">
                      <span className="comment-user-write-data">{this.handleCommentTime(comment.time)}</span>
                      <div className="comment-user-share-funcs">
                        <span className="comment-user-share-func">赞{comment.likeCount > 0 ? `(${comment.likeCount})` : ''}</span>
                        <span className="comment-user-share-func">分享</span>
                        <span className="comment-user-share-func">回复</span>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="comment">
                  <div className="comment-user-avatar-wrapper">
                    <img className="comment-user-avatar" src={comment.user.picUrl}/>
                  </div>
                  <div className="commcomment-user-avatar-wrpperent-user-info">
                    <p className="comment-user-write-content">
                      <span className="comment-user-write-content-user">{comment.user.name}</span>:&nbsp;回复
                        <span className="comment-user-write-content-user">@{comment.replied.user.name}</span>:&nbsp;{comment.content}
                    </p>
                    <p className="comment-user-write-content-replied">
                      <span className="comment-user-write-content-user-replied">{comment.replied.user.name}</span>:&nbsp;{comment.replied.content}
                    </p>
                    <div className="comment-user-other-info">
                      <span className="comment-user-write-data">{this.handleCommentTime(comment.time)}</span>
                      <div className="comment-user-share-funcs">
                        <span className="comment-user-share-func">赞{comment.likeCount > 0 ? `(${comment.likeCount})` : ''}</span>
                        <span className="comment-user-share-func">分享</span>
                        <span className="comment-user-share-func">回复</span>
                      </div>
                    </div>
                  </div>
                </div>
                
              }
            </div>
        )
    }
}

export default Comment