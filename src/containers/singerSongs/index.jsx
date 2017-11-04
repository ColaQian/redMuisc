import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PlayAll from '../../components/playAll/index.jsx'
import SongInfo from '../../components/songInfo/index.jsx'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as playerActions from '../../store/actions/singerInfo.js'
import {mapState} from '../../store/reducers/mapState.js'

import './style.styl'

class SingerSongs extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
      const singerSongs = this.props.singerInfo.hotSongs
        return (
            <div>
              <PlayAll count = {singerSongs ? singerSongs.length : ''}/>
                <div className="song-list-content-songs-wrapper">
                  {
                    singerSongs
                    ? singerSongs.map((item,index) =>{
                      return <SongInfo song={item} num={index} key={index}/> 
                      })
                    : ''
                  }
                </div>
            </div>
        )
    }
}

function bindAction(dispatch) {
  return bindActionCreators(playerActions, dispatch)
}
export default connect(mapState, bindAction)(SingerSongs)