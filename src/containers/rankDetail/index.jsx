import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AvatarInfo from '../../components/avatarInfo/index.jsx'
import SongInfo from '../../components/songInfo/index.jsx'
import InformationShow from '../../components/informationShow/index.jsx'
import BigTitle from '../../components/bigTitle/index.jsx'
import {initScroll} from '../../common/js/initBetterScroll.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as rankInfoActions from '../../store/actions/rankInfo.js' 
import {mapState} from '../../store/reducers/mapState.js'

class RankDetail extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    componentDidMount() {
      console.log(this.props.rankInfo.songs.length)
      this.slider = initScroll(this.songListContent)
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
              <div className="song-list-detail-playall">
                <span className="song-list-detail-playall-btn">播放全部({rankInfo.songs.length})</span>
              </div>
              <div className="song-list-content-wrapper" ref={(songListContent) =>{this.songListContent=songListContent}}>
                <div className="song-list-content">
                  {
                    rankInfo.songs.map((item,index) =>{
                      return <SongInfo key={index} song={item} num={index}/>
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
  return bindActionCreators(rankInfoActions,dispatch)
}
export default connect(mapState,bindAction)(RankDetail)