import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'

import './style.styl'

class PersonRecommend extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    getDay() {
      let day = new Date().getDate()
      if(day.toString().length === 1) {
        return '0' + day 
      }
      return day
    }
    toFM() {}
    toDailyRecom() {}
    toRank() {
      hashHistory.push('/rank')
    }
    render() {
        return (
            <div className="my-recommend">
              <div className="recommend-wrapper" onClick={this.toFM.bind(this)}>
                <div className="recommend personal-fm"></div>
                  <div className="recommend-text">
                    <p className="recommend-title">私人FM</p>
                    <span className="recommend-desc">接受你的音乐专属推荐</span>
                  </div>
              </div>
              <div className="recommend-wrapper recommend-wrapper-daily" onClick={this.toDailyRecom.bind(this)}>
                <div className="recommend daily-recommend">
                  <span>{this.getDay()}</span>
                </div>
                <div className="recommend-text">
                  <p className="recommend-title">每日歌曲推荐</p>
                  <span className="recommend-desc">根据你的口味生成</span>
                </div>
              </div>
              <div className="recommend-wrapper" onClick={this.toRank.bind(this)}>
                <div className="recommend recommend-rank"></div>
                <div className="recommend-text">
                  <p className="recommend-title">排行榜</p>
                  <span className="recommend-desc">最热音乐榜</span>
                </div>
              </div>
            </div>
        )
    }
}

export default PersonRecommend