import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getPlayList} from '../../api/getSongList.js' 
import AvatarInfo from '../../components/avatarInfo/index.jsx'
import {initScroll} from '../../common/js/initBetterScroll.js'
import { hashHistory } from 'react-router'

import './style.styl'

class SongList extends React.Component {
    constructor(props, context) {
        super(props, context)
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
          songList: [],
          category: ['全部','华语','流行','民谣','欧美','影视原声','电子'],
          cate: '全部'
        }
    }
    componentDidMount() {
      this._initSongList('全部')
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.slider) {
        this.slider.refresh()
      } 
    }
    createUser(user) {
      const {avatarUrl,birthday,city,nickname,signature,userId} = user

      return {avatarUrl,birthday,city,nickname,signature,userId}
    }
    _initSongList(cat) {
      let ret = []
      getPlayList(cat,50).then((res) =>{
        if(res.code === 200) {
          res.playlists.map((item) =>{
            ret.push({
              id: item.id,
              name: item.name,
              playCount: item.playCount,
              createTime: item.createTime,
              picUrl: item.coverImgUrl,
              tags: item.tags,
              subscribedCount: item.subscribedCount,
              commentCount: item.commentCount,
              description: item.description,
              creator: this.createUser(item.creator)
            })
          })
        }
        this.setState({
          songList: ret
        })
        if(!this.ifInitScroll){
          this.slider = initScroll(this.playListScroll)
          this.ifInitScroll = true
        }
      })
    }
    handlePlaylist(meta) {
      this._initSongList(meta)
      this.setState({
        cate: meta
      })
    }
    getSongListInfo(id) {
      hashHistory.push('/songList/' + id)
    }
    render() {
      const cate = this.state.category
      const songList = this.state.songList
        return (
            <div className="playlist-wrapper" ref={(playListScroll) =>{this.playListScroll = playListScroll}}>
              <div className="playlist-w">
                <div className="playlist-meta">
                  <p className="playlist-meta-title">歌单分类</p>
                  <ul className="playlist-meta-content">
                    {
                      cate.map((item,index) =>{
                        return <li key={index} className={this.state.cate === item ? "playlist-meta-content-item playlist-meta-content-item-selected" : "playlist-meta-content-item"} onClick={this.handlePlaylist.bind(this,item)}>{item}</li>
                      })
                    }
                  </ul>
                </div>
                <div className="playlist-con-wrapper">
                  {
                    songList.map((item,index) =>{
                      return <div key={index} className="playlist-con">
                              <AvatarInfo avatarInfo={item} width="150" clickAvatar={this.getSongListInfo.bind(this,item.id)}/>
                              </div>
                    })
                  }
                </div>
              </div>
            </div>
        )
    }
}

export default SongList