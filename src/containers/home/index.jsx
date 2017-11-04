import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'
import BigTitle from '../../components/bigTitle/index.jsx'
import TitleColumn from '../../components/titleColumn/index.jsx'

import './style.styl'

class Home extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      navBar: ["个性推荐","歌单","主播电台","主播电台","歌手"]
    }
  }
  navClick(item) {
    switch(item) {
      case '个性推荐':
        hashHistory.push('/find')
        return

      case '歌单':
        hashHistory.push('/find/songList')
        return 

      case '主播电台':
        hashHistory.push('/find/anchorRadio')
        return
      
      case '最新音乐':
        hashHistory.push('/find/latestMusic')
        return

      case '歌手':
        hashHistory.push('/find/singers')
        return

      default:
        return
    }
 }
  render() {
    return (
      <div className="nm-nav">
        <div className="nav">
          <div className="nav-list">
            {/*<h3 className="nav-item" onClick={this.handleClick.bind(this,"/find")}>个性推荐</h3>
            <h3 className="nav-item" onClick={this.handleClick.bind(this,"/find/songList")}>歌单</h3>
            <h3 className="nav-item" onClick={this.handleClick.bind(this,"/find/anchorRadio")}>主播电台</h3>
            <h3 className="nav-item" onClick={this.handleClick.bind(this,"/find/latestMusic")}>最新音乐</h3>
            <h3 className="nav-item" onClick={this.handleClick.bind(this,"/find/singers")}>歌手</h3>*/}
            <TitleColumn titles={['个性推荐','歌单','主播电台','最新音乐','歌手']} columnClick={this.navClick.bind(this)}/>
          </div>
        </div>
        <div className="nav-content">
          {
            this.props.children
          }
        </div>
      </div>
    )
  }
}

export default Home