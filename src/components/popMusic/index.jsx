import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'

//这是‘发现音乐’栏下‘最新音乐’板块的搭建每首歌的组件

class PopMusic extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    handleNewSongIndex(index) {
      let newNum = parseInt(index) + 1
      if(newNum.toString().length > 1) {
        return newNum
      }
      return '0' + newNum
    }
    render() {
      const newSong = this.props.newSong
      const newSongIndex = this.handleNewSongIndex(newSong.index)
        return (
            <div className="new-song-wrapper">
              <span className="new-song-index">{newSongIndex}</span>
              <span className="new-song-img" style={{ backgroundImage: 'url(' + newSong.picUrl + ')'}}></span>
              <div className="new-song-desc">
                <p>{newSong.name}</p>
                <span>{newSong.singerName}</span>
              </div>
            </div>
        )
    }
}

export default PopMusic