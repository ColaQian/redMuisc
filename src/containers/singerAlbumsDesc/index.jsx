import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as playerActions from '../../store/actions/singerInfo.js'
import {mapState} from '../../store/reducers/mapState.js'
import AlbumCover from '../../components/albumCover/index.jsx'
import { hashHistory } from 'react-router'

import './style.styl'

class SingerAlbumsDesc extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    toAlbumInfo(id) {
      hashHistory.push('/albumInfo/' + id)
    }
    render() {
        return (
            <div className="singer-album-desc">
                {
                    this.props.singerInfo.singerAlbums
                    ?  this.props.singerInfo.singerAlbums.map((item,index) =>{
                          return <div key={index} className="singer-album-desc-item">
                                    <AlbumCover album={item} albumClick={this.toAlbumInfo.bind(this,item.id)}/>
                                 </div>
                      })
                    :   ''
                }
            </div>
        )
    }
}

function bindAction(dispatch) {
  return bindActionCreators(playerActions, dispatch)
}
export default connect(mapState, bindAction)(SingerAlbumsDesc)