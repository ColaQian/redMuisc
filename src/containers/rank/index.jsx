import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import BigTitle from '../../components/bigTitle/index.jsx'
import RecommendTitle from '../../components/recommendTitle/index.jsx'
import RankItem from '../../components/rankItem/index.jsx'
import BScroll from 'better-scroll'
import {initScroll} from '../../common/js/initBetterScroll.js'

import './style.styl'

class Rank extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    componentDidMount() {
      this.slider = new BScroll(this.officalRank,{
          scrollX: true,
          scrollY: false,
          click: true
        })
    }
    render() {
      const officalRanks = ['飙升榜','新歌榜','原创榜','热歌榜']
        return (
          <div className="rank-wrapper">
            <BigTitle title={'排行榜'}/>
            <div className="rank">
              <RecommendTitle title={'官方榜'} noMore={'noMore'}/>
              <div className="offical-rank" ref={(officalRank)=>{this.officalRank=officalRank}}>
                <div className="offical-rank-scroll">
                  {
                    officalRanks.map((item,index) =>{
                      return  <div key={index} className="offical-rank-item">
                                  <RankItem rankType={item} key={index}/>
                              </div>
                    })
                  }
                </div>  
              </div>
              <RecommendTitle title={'全球榜'} noMore={'noMore'}/>
              <div>
              </div>
            </div>
          </div>
        )
    }
}

export default Rank