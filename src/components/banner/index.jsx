import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import BScroll from 'better-scroll'
import {addClass} from '../../common/js/dom.js' 

import './style.styl'

class Banners extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    componentDidMount() {
      setTimeout(() =>{
        this._setSliderWidth()
        this._initSlider()
        this._play()
      },20)
    }
    _setSliderWidth() {
        this.currentPageIndex = 0
        this.children = this.refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.refs.slider.clientWidth
        for(let i = 0 ; i < this.children.length ; i++ ){
          let child = this.children[i]
          addClass(child,"slider-item")
          child.style.width = sliderWidth + "px"
          width += sliderWidth
        }
        width += sliderWidth * 2
        this.refs.sliderGroup.style.width = width + "px"
      }
      /*_initDots() {
        this.dots = new Array(this.children.length)
      }*/
      _initSlider() {
        this.slider = new BScroll(this.refs.slider,{
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap:true,
          snapLoop:true,
          snapThreshold: 0.3,
          snapSpeed: 400
        })
        this.slider.on("scrollEnd", () =>{
          let currentIndex = this.slider.getCurrentPage().pageX
          currentIndex -= 1
          this.currentPageIndex = currentIndex
          if(this.timer) {
            clearTimeout(this.timer)
          }
          this._play()
        })
      }
      _play() {
        let pageIndex = this.currentPageIndex + 1
        pageIndex += 1
        this.timer = setTimeout(() =>{
          this.slider.goToPage(pageIndex,0,400)
        },3000);
      }
    render() {
        const banners = this.props.banners
        return (
            <div>
              <div className="slider" ref="slider">
                <div className="slider-group" ref="sliderGroup">
                  {
                    banners.map((item,index) =>{
                      return (
                        <div key={index}>
                          <a>
                            <img src={item.imgUrl}/>
                          </a>
                          <div className="item-meta">
                            <span className="item-meta-text">{item.typeTitle}</span>
                          </div>
                        </div>)
                    })
                  }
                </div>
              </div>
            </div>
        )
    }
}

export default Banners