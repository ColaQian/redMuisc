import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AlbumCover from '../../components/albumCover/index.jsx'
import {initScroll} from '../../common/js/initBetterScroll.js'
import {getLatestMusic} from '../../api/getLatestMusic.js'
import {createAlbum} from '../../common/js/createAlbum.js'
import { hashHistory } from 'react-router'

import './style.styl'

class LatestMusic extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
          albums: [],
          totalAlbums: 0,
          initDone: false
        }
    }
    componentDidMount() {
      this.latestMusicOffset = 0
      this._initLatestMusic()
      setTimeout(() =>{
        this._initSlider()
      },20)
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.slider) {
        this.slider.refresh()
      } 
    }
    _initSlider() {
      this.slider = initScroll(this.latestMusic)
      this.slider.on('scroll',() =>{
        let latestMusicBottom = this.latestMusic.getBoundingClientRect().bottom
        let scrollBottom = this.latestScroll.getBoundingClientRect().bottom
        if(latestMusicBottom - scrollBottom > 20) {
          if(this.state.albums.length === this.state.totalAlbums) {
            return
          }
          getLatestMusic(this.latestMusicOffset+20,20).then((res) =>{
            let ret = []
            if(res.code === 200) {
              res.albums.forEach((item) =>{
                ret.push(createAlbum(item))
              })
              this.setState({
                albums: this.state.albums.concat(ret)
              })
              this.latestMusicOffset += 20 
            }
          })
        }
      })
    }
    _initLatestMusic() {
      let music = []
      let totalAlbums = 0
      getLatestMusic(this.latestMusicOffset,20).then((res) =>{
        if(res.code === 200) {
          res.albums.forEach((item) =>{
            music.push(createAlbum(item))
          })
          totalAlbums = res.total
        }
        this.setState({
          albums: music,
          totalAlbums: totalAlbums,
          initDone: true
        })
      })
    }
    toAlbumInfo(id) {
      hashHistory.push('/albumInfo/' + id)
    }
    render() {
        return (
            <div className="latest-music-wrapper">
              <div className="latest-music-title">
                <div className="latest-music-title-blur"></div>
                <span className="latest-music-title-item">新碟上架</span>
              </div>
              <div className="latest-music" ref={(latestMusic) =>{this.latestMusic=latestMusic}}>
                <div className="latest-music-scroll" ref={(latestScroll) =>{this.latestScroll=latestScroll}}>
                  <div className="latest-music-content">
                    {
                      this.state.initDone
                      ? this.state.albums.map((item,index) =>{
                          return  <div key={index} className="latest-music-content-item">
                                    <AlbumCover album={item} showCreator={true} albumClick={this.toAlbumInfo.bind(this,item.id)}/>
                                  </div>
                        })
                      : '加载中...'
                    }
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default LatestMusic