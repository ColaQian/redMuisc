import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {playCountHandle} from '../../common/js/handleCount.js'

import './style.styl'

class AvatarInfo extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    handleAvatarClick() {
      this.props.clickAvatar()
    }
    render() {
      const avatarInfo = this.props.avatarInfo
      const width = this.props.width ? this.props.width + 'px' : ''
      const wetherShow = this.props.nameShow ? 'none' : ''
      let count = ''
      let ifShowCont = 'none'
      let ifShowCreator = 'block'
      if(avatarInfo.playCount !== undefined) {
        count = playCountHandle(avatarInfo.playCount)
        ifShowCont = ''
      }
      if(avatarInfo.creatorId) {
        ifShowCreator = 'none'
      }
        return (
            <div className="recommend-song-list-wrapper" style={{width: width}} onClick={this.handleAvatarClick.bind(this)}>
              <div className="recommend-song-list-top" style={{height: width}}>
                <img src={avatarInfo.picUrl}/>
                <h3 style={{display: ifShowCont}} className="recommend-song-list-top-count"><i></i>{count}</h3>
              </div>
              <p className="recommend-song-list-bottom" style={{width: width,display: wetherShow}}>{avatarInfo.name || avatarInfo.singerName}</p>
              <p className="recommend-song-list-bottom-user" style={{width: width,display: ifShowCreator}}>{avatarInfo.creator? 'by '+avatarInfo.creator.nickname : ''}</p>
            </div>
        )
    }
}

export default AvatarInfo