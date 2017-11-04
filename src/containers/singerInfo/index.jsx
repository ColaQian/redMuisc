import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import BigTitle from '../../components/bigTitle/index.jsx'
import AvatarInfo from '../../components/avatarInfo/index.jsx'
import SingerInfoShow from '../../components/singerInfoShow/index.jsx'
import TitleColumn from '../../components/titleColumn/index.jsx'
import {getSingerInfo,getSingerAlbums,getSimilarSingers} from '../../api/getSingerInfo.js'
import {createSong} from '../../common/js/createSong.js'
import {getSongUrl} from '../../api/getSongDetail.js'
import {getColor} from '../../common/js/getBackgroundColor.js'
import {createAlbum} from '../../common/js/createAlbum.js'
import {initScroll} from '../../common/js/initBetterScroll.js'
import {hashHistory} from 'react-router'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as playerActions from '../../store/actions/singerInfo.js'
import {mapState} from '../../store/reducers/mapState.js'

import './style.styl'

class SingerInfo extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
          singerInfo: null,
          singerSongs: [],
          initDone: false
        }
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.slider) {
        this.slider.refresh()
      } 
    }
    componentDidMount() {
      this.albumOffset = 1
      this.hasMoreAlbums = false
      this._initSingerInfo()
      setTimeout(() =>{
        this._initBScroll()
      },20)
    }
    _initBScroll() {
      /*this.slider = new BScroll(this.songList,{
        scrollX: true,
        scrollY: true,
        probeType: 2,
        click: true
      })*/
      this.slider = initScroll(this.songList)
    }
    _initSingerInfo() {
      const id = this.props.params.id
      let singerInfo = null
      let singerSongs = []
      getSingerInfo(id).then((res) =>{
        if(res.code === 200) {
          let singer = res.artist
          singerInfo = {
            id: singer.id,
            name: singer.name,
            picUrl: singer.img1v1Url,
            albumCount: singer.albumSize,
            mvCount: singer.mvSize,
            songCount: singer.musicSize,
            accountId: singer.accountId,
            singerDesc: singer.briefDesc
          }
          res.hotSongs.forEach((item) =>{
            singerSongs.push(createSong(item))
          })
          singerSongs.forEach((item,index) =>{
            getSongUrl(item.id).then((res) =>{
              singerSongs[index] = {...singerSongs[index],url:res.data[0].url}
            })
          })
          //console.log(singerSongs)
        }
        this.setState({
          singerInfo: singerInfo,
          singerSongs: singerSongs,
          initDone: true,
          picUrl: singerInfo.picUrl
        })
        this.props.setSingerHotSongs(singerSongs)
      })
    }
    getAlbums() {
      const id = this.props.params.id
      if(!this.albumColumnClicked) {
        getSingerAlbums(id,15,this.albumOffset++).then((res) =>{
          let albums = []
          if(res.code === 200) {
            res.hotAlbums.map((item) =>{
              albums.push(createAlbum(item))
            })
            this.hasMoreAlbums = res.more
          }
          this.props.setSingerAlbums(albums)
        })
        this.albumColumnClicked = true
      }
    }
    getSingerDesc() {
      if(!this.descColumnClicked) {
        this.props.setSingerDesc(this.state.singerInfo.singerDesc)
      }
      this.descColumnClicked = true
    }
    getSimilar() {
      const id = this.props.params.id
      console.log("相似歌手点击" + id)
      if(!this.similarColumnClicked) {
        getSimilarSingers(id).then((res) =>{
          console.log(res)
          if(res.code === 200) {
            console.log(res)
          }
        })
      }
      this.similarColumnClicked = false
    }
    toggleSingerInfo(item) {
      switch(item) {
        case '热门50':
          hashHistory.push('/singerInfo/' + this.props.params.id)
          return  

        case '专辑':
          hashHistory.push('/singerInfo/' + this.props.params.id + '/album')
          this.getAlbums()
          return 

        case 'MV':
          hashHistory.push('/singerInfo/' + this.props.params.id + '/mv') 
          return

        case '歌手详情':
          hashHistory.push('/singerInfo/' + this.props.params.id + '/intro')
          this.getSingerDesc()
          return

        case '相似歌手':
          hashHistory.push('/singerInfo/' + this.props.params.id + '/similar')
          this.getSimilar()
          return

        default:
          return 
      }
    }
    render() {
      const singerSongs = this.state.singerSongs
      const singerInfo = this.state.singerInfo
      let picUrl = ''
      if(this.state.singerSongs) {
        picUrl = this.state.singerSongs.picUrl
      }
        return (
            <div className="singer-info-wrapper">
            <div className="singer-info-background" style={{background:'url('+ this.state.picUrl +')'}}></div>
            <div className="singer-info-background2" style={{background: getColor()}}></div>
            <div className="singer-info">
              <BigTitle title="歌手"/>
              <div className="singer-info-top">
                <div className="singer-info-top-avatar">
                  {
                    this.state.initDone
                    ? <AvatarInfo avatarInfo={singerInfo} width="200" nameShow="lala"/>
                    : "loading..."
                  }
                </div>
                <div className="singer-info-top-desc">
                  {
                    this.state.initDone
                    ? <SingerInfoShow info={singerInfo}/>
                    : "loading..."
                  }
                </div>
              </div>
              <div className="song-list-content-wrapper">
                <TitleColumn titles={['热门50','专辑','MV','歌手详情','相似歌手']} columnClick={this.toggleSingerInfo.bind(this)}/>
                <div className="song-list-content-wrapper" ref={(songList) =>{this.songList = songList}}>
                  <div className="song-list-content">
                    {
                      this.props.children
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>  
        )
    }
}

function bindAction(dispatch) {
  return bindActionCreators(playerActions, dispatch)
}
export default connect(mapState, bindAction)(SingerInfo)