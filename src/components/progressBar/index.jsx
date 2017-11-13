import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.styl'

class ProgressBar extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    componentWillMount() {
      this.touch = {}
      this.BAR_BTN = 12
    }
    componentDidUpdate() {
      this._updateSongPlayingTime(this.props.currentSongPercent)
    }
    _updateSongPlayingTime(percent) {
      if(percent > 0 && !this.touch.initialState) {
        const barWidth = this.refs.progressBar.clientWidth - this.BAR_BTN
        const offsetWidth = percent * barWidth
        this._offsetWidth(offsetWidth)
      }
    }
     progressTouchStart(e) {
        e.preventDefault()
        this.touch.initialState = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.refs.progress.clientWidth
      }
      progressTouchMove(e) {
        e.preventDefault()
        if(!this.touch.initialState) {
          return
        }
        const delta = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.refs.progressBar.clientWidth - this.BAR_BTN,Math.max(0,this.touch.left+delta))
        this._offsetWidth(offsetWidth)
      }
      progressTouchEnd(e) {
        e.preventDefault()
        this.touch.initialState = false
        this._triggerPercent()
      }
      progressClick(e) {
        const rec = this.refs.progressBar.getBoundingClientRect()
        const offset = e.pageX - rec.left
        this._offsetWidth(offset)
        this._triggerPercent()
      }
      _triggerPercent() {
        const barWidth = this.refs.progressBar.clientWidth - this.BAR_BTN
        const newPercent = this.refs.progress.clientWidth / barWidth
        this.props.updateCurrentSongProgress(newPercent)
      }
      _offsetWidth(offsetWidth) {
        this.refs.progress.style.width = `${offsetWidth}px`
        this.refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
    }
    render() {
        return (
            <div className="progress-bar" ref="progressBar" onClick={this.progressClick.bind(this)}>
              <div className="bar-inner">
                <div className="progress" ref="progress"></div>
                <div  className="progress-btn-wrapper" 
                      ref="progressBtn"
                      onTouchStart={this.progressTouchStart.bind(this)}
                      onTouchMove={this.progressTouchMove.bind(this)}
                      onTouchEnd={this.progressTouchEnd.bind(this)}>
                  <div className="progress-btn"></div>
                </div>
              </div>
            </div>
        )
    }
}

export default ProgressBar