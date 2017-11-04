import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from "react-redux"
//import * as playerActions from '../../store/actions/singerInfo.js'
import {mapState} from '../../store/reducers/mapState.js'

import './style.styl'

class SingerIntro extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
        return (
            <div>
              <p className="singer-intro">
                {
                  this.props.singerInfo.singerDesc
                  ? this.props.singerInfo.singerDesc
                  : '加载中...'
                }
              </p>
            </div>
        )
    }
}

function bindAction(dispatch) {
  //return bindActionCreators(playerActions, dispatch)
  return {}
}
export default connect(mapState, bindAction)(SingerIntro)