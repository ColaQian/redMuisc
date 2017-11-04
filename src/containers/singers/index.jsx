import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {initScroll} from '../../common/js/initBetterScroll.js'
import {createSinger} from '../../common/js/createSinger.js'
import AvatarInfo from '../../components/avatarInfo/index.jsx'
import {
  getSingers
} from '../../api/singers.js'
import { hashHistory } from 'react-router'

import './style.styl'

class Singers extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
          singerList: [],
          hasMoreSingers: true
        }
    }
    componentDidMount() {
      this.offsetSinger = 0
      this._initSingerInfo()
      setTimeout(() =>{
        this._initBScroll()
      },20)
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.slider) {
        this.slider.refresh()
      } 
    }
    _initSingerInfo() {
      let singerInfo = []
      getSingers(this.offsetSinger,20).then((res) =>{
        if(res.code === 200) {
          console.log(res)
          res.artists.map((item) =>{
            singerInfo.push(createSinger(item))
          })
          this.setState({
            singerList: singerInfo,
            hasMoreSingers: res.more
          })
        }
      })
    }
    _initBScroll() {
      this.slider = initScroll(this.singer)
        let timeoutId = null
        this.slider.on('scroll', () =>{
        if(timeoutId) {
          clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() =>{
          let singerBottom = this.singer.getBoundingClientRect().bottom
          let singerContentBottom = this.singerContent.getBoundingClientRect().bottom
          console.log("singer已经在滚动了"+singerContentBottom+singerBottom)
          if(singerBottom - singerContentBottom > 30) {
            if(!this.state.hasMoreSingers) {
              return
            }
            getSingers(this.offsetSinger + 20 , 20).then((res) =>{
              let ret = []
              console.log(this.offsetSinger)
              if(res.code === 200) {
                res.artists.map((item) =>{
                  ret.push(createSinger(item))
                })
                this.setState({
                  singerList: this.state.singerList.concat(ret),
                  hasMoreSingers: res.more
                })
                this.offsetSinger = this.offsetSinger + 20
              }
            })
          }
        }, 100)
      })
    }
    getSingerInfo(id) {
      hashHistory.push("/singerInfo/" + id)

    }
    render() {
      const singers = this.state.singerList
        return (
            <div className="singers-wrapper" ref={(singer) =>{this.singer = singer}}>
              <div className="singers" ref={(singerContent) =>{this.singerContent = singerContent}}>
                {
                  singers.map((item,index) =>{
                    return <div key={index} className="singer-item">
                      <AvatarInfo avatarInfo={item} width="150" clickAvatar={this.getSingerInfo.bind(this,item.id)}/>
                    </div>
                  })
                }
              </div>
            </div>
        )
    }
}

export default Singers