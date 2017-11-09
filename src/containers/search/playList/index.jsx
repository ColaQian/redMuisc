import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {playCountHandle} from '../../../common/js/handleCount.js'
import {hashHistory} from 'react-router'

import './style.styl'

class PlayList extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    playListInfo(id) {
      hashHistory.push('/songList/' + id)
    }
    render() {
      const playList = this.props.playList
      const playListBack = this.props.playListIndex % 2 === 0 ? '#f5f5f5' : ''
        return (
            <div className="playlist" style={{background: playListBack}} onClick={this.playListInfo.bind(this,playList.playListId)}>
              <div className="playlist-img-wrapper"><img className="playlist-img" src={playList.picUrl}/></div>
              <p className="playlist-name">{playList.playListName}</p>
              <p className="playlist-item playlist-count">{playList.songsCount}首</p>
              <p className="playlist-item playlist-creator">by&nbsp;{playList.playListCreatorName}</p>
              <p className="playlist-item plalist-play-count">播放:{playCountHandle(playList.songsCount)}</p>
            </div>
        )
    }
}

export default PlayList