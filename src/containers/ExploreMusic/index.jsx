import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {initScroll} from '../../common/js/initBetterScroll.js'
import {
  getBanner,getRecommendSongList,getLatestMusic,getRecommendDjProgram
} from '../../api/exploreMusic.js'
import Banners from '../../components/banner/index.jsx'
import PersonRecommend from '../../components/personRecommend/index.jsx'
import RecommendTitle from '../../components/recommendTitle/index.jsx'
import AvatarInfo from '../../components/avatarInfo/index.jsx'
import PopMusic from '../../components/popMusic/index.jsx'
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
    handleSingerName(namesList) {
      let ret = ''
      if(namesList.length > 1) {
        for(let i = 1 ; i < namesList.length ; i++) {
          ret += namesList[i].name + '/'
        }
        return ret.slice(0,ret.length-1)
      }
      return namesList[0].name
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
            ret3.push(Object.assign({},{
              id: item.id,
              name: item.name,
              singerName: this.handleSingerName(item.song.artists),
              index: index,
              picUrl: item.song.album.blurPicUrl
            }))
          })
        }
        this.setState({
          banners: ret1,
          songLists: ret2,
          newSongs: ret3,
          initDone: true
        })
      })
      getRecommendDjProgram().then((res) =>{
        if(res.code === 200) {
          console.log(res)
        }
      })
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
                    <AvatarInfo avatarInfo={item} width="220"/>
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
                      <PopMusic newSong={item}/>  
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

export default ExploreMusic