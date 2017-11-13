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
    newSongClick() {
      if(timeid) {
            clearTimeout(timeid)
        }
      this.newSong.style.animation = 'newSongClick 0.8s'
      let timeid = setTimeout(() =>{
        this.newSong.style.animation = ''
      },1200)
    }
    newSongDoubleClick() {
      this.props.newSongPlay()
    }
    render() {
      const newSong = this.props.newSong
      const newSongIndex = this.handleNewSongIndex(this.props.songIndex)
        return (
            <div className="new-song-wrapper" 
                 onClick={this.newSongClick.bind(this)}
                 onDoubleClick={this.newSongDoubleClick.bind(this)}
                 ref={(newSong) =>{this.newSong=newSong}}>
              <span className="new-song-index">{newSongIndex}</span>
              <span className="new-song-img" style={{ backgroundImage: 'url(' + newSong.album.picUrl + ')'}}></span>
              <div className="new-song-desc">
                <p>{newSong.name}</p>
                <span>{newSong.singer.name}</span>
              </div>
            </div>
        )
    }
}

export default PopMusic