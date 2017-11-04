import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getRank} from '../../api/getRank.js'

import './style.styl'

class RankItem extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
          songs: [],
          picUrl: null,
          initDone: false
        }
    }
    componentWillMount() {
      this.rankItemTop = ['rank-item-top']
      this.rankItemMiddle = ['']
      this.rankItemBottom = ['rank-item-bottom']
    }
    componentDidMount() {
      this.filterType(this.props.rankType)
    }
    filterType(item) {
      switch(this.props.rankType){
        case '飙升榜':
          this.rankItemTop.push('top-super-raise')
          this.rankItemBottom.push('bottom-super-raise')
          getRank(3).then((res) =>{
            let ret = []
            let pic = null
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic
              })
              console.log('这是拉拉'+ret.length)
            }
          })
          break
        
        case '新歌榜': 
          this.rankItemTop.push('top-new-songs')
          this.rankItemBottom.push('bottom-new-songs')
          getRank(0).then((res) =>{
            let ret = []
            let pic = null
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic
              })
            }
          })
          break
        
        case '热歌榜':
          this.rankItemTop.push('top-hot-songs')
          this.rankItemBottom.push('bottom-new-songs')
          getRank(1).then((res) =>{
            let ret = []
            let pic = null
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic
              })
            }
          })
          break
        
        case '原创榜': 
          this.rankItemTop.push('top-origin-songs')
          this.rankItemBottom.push('bottom-origin-songs')
          getRank(2).then((res) =>{
            let ret = []
            let pic = null
            if(res.code === 200) {
              res.result.tracks.slice(0,3).map((item,index) =>{
                ret.push({index: index+1,name:item.name,singerName: item.artists[0].name})
              })
              pic = res.result.tracks[0].album.picUrl
              this.setState({
                songs: ret,
                initDone: true,
                picUrl: pic
              })
            }
          })
          break
    
        default: 
          console.log('没有匹配的')
      }
    }
    render() {
        return (
            <div className="rank-item">
              <div className={this.rankItemTop.join(' ')}>
                <span className="rank-item-top-desc">{this.props.rankType}</span>
              </div>
              <div className='rank-item-middle'>
                <div className="rank-item-middle-content">
                  {
                    this.state.initDone
                    ?
                    this.state.songs.map((item,index) =>{
                      return <span className="rank-item-middle-content-item" key={index}>{index+1}.{item.name}-{item.singerName}</span>
                    })
                    :
                    '加载中...'
                  }
                </div>
              </div>
              <div className={this.rankItemBottom.join(' ')} style={{backgroundImage: 'url(' + this.state.picUrl +')'}}></div>
            </div>
        )
    }
}

export default RankItem