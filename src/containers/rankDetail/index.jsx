import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AvatarInfo from '../../components/avatarInfo/index.jsx'
import SongInfo from '../../components/songInfo/index.jsx'
import InformationShow from '../../components/informationShow/index.jsx'
import BigTitle from '../../components/bigTitle/index.jsx'
import {getSongUrl} from '../../api/getSongDetail.js'
import PlayAll from '../../components/playAll/index.jsx'
import {initScroll} from '../../common/js/initBetterScroll.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as playerActions from '../../store/actions/player.js' 
import {mapState} from '../../store/reducers/mapState.js'

import './style.styl'

class RankDetail extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    componentWillMount() {
      this.completeSongs = []
    }
    componentDidMount() {
      this.slider = initScroll(this.songListContent)
      this.props.rankInfo.songs.map((item,index) =>{
        getSongUrl(item.id).then((res) =>{
          if(res.code === 200) {
            this.completeSongs[index] = {...item,url: res.data[0].url}
          }
        })
      })
    }
    addRanktToPlayer(index) {
      if(this.completeSongs.length !== this.props.rankInfo.songs.length) {
        alert("歌曲正在加载中,请稍后尝试!")
        return 
      }
      if(this.props.player.playList.length === this.props.rankInfo.songs.length || this.props.rankInfo.songs.length === 0) {
        this.props.setCurrentIndex(index)
        this.props.setCurrentSong()
        this.props.setPlayingState(true)
        return
      }
     this.props.setPlayList(this.completeSongs)
      this.props.setCurrentIndex(index)
      this.props.setCurrentSong()
      this.props.setPlayingState(true)
    }
    render() {
      let rankInfo = this.props.rankInfo
      let picUrl = ''
      if(this.props.rankInfo !== null) {
        picUrl = this.props.rankInfo.picUrl
      }
        return (
            <div className="song-list-detail-wrapper">
            <div className="song-list-detail-background" style={{background:'url('+ picUrl +')'}}></div>
            <div className="song-list-detail-background2"></div>
            <div className="song-list-detail">
              <BigTitle title="排行榜"/>
              <div className="song-list-info">
                <div className="song-list-info-avatar">
                  {
                    //this.state.initDone
                     <AvatarInfo avatarInfo={{...rankInfo,songs: null,songIds: null}} width="200" nameShow="lala"/>
                    //: "loading..."
                  }
                </div>
                <div className="song-list-info-desc">
                  {
                    //this.state.initDone
                     <InformationShow info={{...rankInfo,songs: null,songIds: null}}/>
                    //: "loading..."
                  }
                </div>
              </div>
              <PlayAll count={rankInfo.songs.length}/>
              <div className="song-list-content-wrapper" ref={(songListContent) =>{this.songListContent=songListContent}}>
                <div className="song-list-content">
                  {
                    rankInfo.songs.map((item,index) =>{
                      return <SongInfo key={index} song={item} num={index} playSong={this.addRanktToPlayer.bind(this,index)}/>
                    })
                  }
                </div>
              </div>
            </div>
          </div>  
        )
    }
}

function bindAction(dispatch) {
  return bindActionCreators(playerActions,dispatch)
}
export default connect(mapState,bindAction)(RankDetail)