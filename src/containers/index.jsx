import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    bindActionCreators
} from 'redux'
import SideBar from '../components/sideBar/index.jsx'
import {
    connect
} from 'react-redux'

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
                    <div className="mini-player">
                    </div>
                </div>
            </div>
        )
    }
}

export default App