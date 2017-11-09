import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import SideBar from '../components/sideBar/index.jsx'
import ProgressBar from '../components/progressBar/index.jsx'
import {connect} from 'react-redux'

import './style.styl'
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: true,
            sideItem: ["搜索", "发现音乐", "MV", "个人中心"],
            myMusic: ["最近播放", "我的音乐云盘", "我的电台", "我的收藏"]
        }
    }
    render() {
        const sideItem = this.state.sideItem
        const myMusic = this.state.myMusic
        return (
            <div className="nm-music">
                <div className="nm-sidebar">
                    <div className="nm-sidebar-back-wrapper">
                        <span className="nm-sidebar-back">back</span>
                    </div>
                    <SideBar sideItem={sideItem} sideTitle="发现"/>
                    <SideBar sideItem={myMusic} sideTitle="我的音乐"/>
                </div>
                <div className="nm-main">
                    {   
                        this.state.initDone
                        ? this.props.children
                        : "正在加载中"
                    }
                </div>
                <div className="nm-player">
                    <div className="normal-player">
                        
                    </div>
                    <div className="mini-player">
                    <div className="mini-player-line"></div>
                      <div className="mini-player-avatar-wrapper">
                        <div className="mini-player-toggle"></div>
                        <img src='http://p1.music.126.net/7hYHVlrsJoxEsJDI5Gbofg==/2098967697445634.jpg' className="mini-player-avatar"/>
                      </div> 
                      <div className="mini-player-play-wrapper">
                        <span className="mini-player-play-item mini-player-play-presong"></span>
                        <span className="mini-player-play-item mini-player-play-toggle"></span>
                        <span className="mini-player-play-item mini-player-play-next"></span>
                      </div>  
                      <div className="mini-player-songinfo-progress">
                        <div className="mini-player-songinfo">
                          <p>童话镇-<span>陈一发</span></p>
                          <p></p>
                        </div>
                        <div className="mini-player-progress">
                          <ProgressBar/>
                        </div>
                      </div>
                      <div className="mini-player-funcs">
                        <span className="">love</span>
                        <span>mode</span>
                        <span>voice</span>
                        <span>list</span>
                      </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App