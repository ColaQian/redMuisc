import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {initScroll} from '../../common/js/initBetterScroll.js'
import {
  getBanner,getRecommendSongList,getLatestMusic,getRecommendDjProgram
} from '../../api/exploreMusic.js'
import {getSongUrl} from '../../api/getSongDetail.js'
import {createSongForExploreNewSong} from '../../common/js/createSongForExploreNewSong.js'
import Banners from '../../components/banner/index.jsx'
import PersonRecommend from '../../components/personRecommend/index.jsx'
import RecommendTitle from '../../components/recommendTitle/index.jsx'
import AvatarInfo from '../../components/avatarInfo/index.jsx'
import PopMusic from '../../components/popMusic/index.jsx'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as playerActions from '../../store/actions/player.js'
import {mapState} from '../../store/reducers/mapState.js'

import './style.styl'

class ExploreMusic extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
          banners:[],
          songLists: [],
          newSongs: [],
          initDone: false
        }
    }
    componentWillMount() {
      this.completeNewSong = []
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.slider) {
        this.slider.refresh()
      }
    }
    componentDidMount() {
      this._initialState()
      setTimeout(() => {
        this._initScroll()
      },20)
    }
    _initScroll() {
      this.slider = initScroll(this.exploreWrapper)
    }
    _initialState() {
      let ret1 = []
      let ret2 = []
      let ret3 = []

      getBanner().then((res) =>{
        if(res.code === 200) {
          res.banners.map((item,index) =>{
            ret1.push(Object.assign({},{
              imgUrl: item.pic,
              titleColor: item.titleColor,
              typeTitle:item.typeTitle,
              id: item.targetId
            }))
          })
        }
      })
      getRecommendSongList().then((res) =>{
        if(res.code === 200) {
          res.result.map((item) =>{
            ret2.push(Object.assign({},{
              copywriter: item.copywriter,
              id: item.id,
              name: item.name,
              picUrl: item.picUrl,
              playCount: item.playCount
            }))
          })
        } 
      })
      getLatestMusic().then((res) =>{
        if(res.code === 200) {
          res.result.map((item,index) =>{
            ret3.push(createSongForExploreNewSong(item.song))
          })
        }
        this.setState({
          banners: ret1,
          songLists: ret2,
          newSongs: ret3,
          initDone: true
        })
        ret3.map((item,index) =>{
          console.log("newSong准备加载")
          getSongUrl(item.id).then((res) =>{
            if(res.code === 200) {
              this.completeNewSong[index] = {...item,url: res.data[0].url}
            }
          })
        })
      })
      getRecommendDjProgram().then((res) =>{
        if(res.code === 200) {
          console.log(res)
        }
      })
    }
    clickRecommendSongList(item) {
      hashHistory.push('/songList/' + item.id)
    }
    addNewSongToPlayer(index) {
      if(this.completeNewSong.length !== this.state.newSongs.length) {
        alert("歌曲正在加载,请稍后再尝试!")
        return 
      }
      if(this.completeNewSong.length === this.props.player.playList.length) {
        this.props.setCurrentIndex(index)
        this.props.setCurrentSong()
        this.props.setPlayingState(true)
        return
      }
      this.props.setPlayList(this.completeNewSong)
      this.props.setCurrentIndex(index)
      this.props.setCurrentSong()
      this.props.setPlayingState(true)
    }
    render() {
      const banners = this.state.banners
      const songLists = this.state.songLists
      const newSongs = this.state.newSongs
      return (
        <div className="explore-music-wrapper" ref={(exploreWrapper) =>{this.exploreWrapper = exploreWrapper}}>
          <div className="explore-music">
            <div className="lala">
            {
              this.state.initDone
              ? <Banners banners={banners}/>
              : "正在加载..."
            }
          </div>
          <PersonRecommend/>
          <div className="recommend-song-list">
            <RecommendTitle title="推荐歌单"/>
            <div className="recommend-song-list-content">
              {
                this.state.initDone
                ?
                songLists.map((item,index) =>{
                  return <div key={index} className="recommend-song-list-content-item">
                    <AvatarInfo avatarInfo={item} width="210" clickAvatar={this.clickRecommendSongList.bind(this,item)}/>
                  </div>
                })
                : 
                "正在加载..."
              }
            </div>
          </div>
          <div className="latest-music">
              <RecommendTitle title="最新音乐"/>
              <div className="latest-music-content">
                {
                  this.state.initDone
                  ?
                  newSongs.map((item,index) =>{
                    return <div key={index} className="latest-music-content-item">
                      <PopMusic newSong={item} songIndex={index} newSongPlay={this.addNewSongToPlayer.bind(this,index)}/>  
                    </div>
                  })
                  :
                  "正在加载..."
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
export default connect(mapState,bindAction)(ExploreMusic)