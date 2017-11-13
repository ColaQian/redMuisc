import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'
import './icon.styl'

class PlayAll extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    playAllClick() {
        if(timeid) {
            clearTimeout(timeid)
        }
        this.playallBtn.style.animation = 'playClick 0.8s'
        let timeid = setTimeout(() =>{
            this.playallBtn.style.animation = ''
        },1200)
    }
    render() {
        return (
             <div className="playall">
                <span className="playall-btn" 
                onClick={this.playAllClick.bind(this)}
                ref={(playallBtn) =>{this.playallBtn = playallBtn}}>
                    <i className="icon-playAll"></i>播放全部({this.props.count})
                </span>
            </div>
        )
    }
}

export default PlayAll 