import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import App from '../containers/index.jsx'
import Home from '../containers/home/index.jsx'
import ExploreMusic from '../containers/ExploreMusic/index.jsx'
import AnchorRadio from '../containers/AnchorRadio/index.jsx'
import SongList from '../containers/SongList/index.jsx'
import Singers from '../containers/singers/index.jsx'
import SongListDetail from '../containers/songListDetail/index.jsx'
import SingerInfo from '../containers/singerInfo/index.jsx'
import SingerSongs from '../containers/singerSongs/index.jsx'
import SingerAlbumsDesc from '../containers/singerAlbumsDesc/index.jsx'
import SingerMVsDesc from '../containers/singerMVsDesc/index.jsx'
import SingerSimilar from '../containers/singerSimilar/index.jsx'
import SingerIntro from '../containers/singerIntro/index.jsx'
import LatestMusic from '../containers/latestMusic/index.jsx'
import AlbumInfo from '../containers/albumInfo/index.jsx'
import Rank from '../containers/rank/index.jsx'
import RankDetail from '../containers/rankDetail/index.jsx'
import Search from '../containers/search/index.jsx'


class RouterMap extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                    
                    //发现音乐的路由配置
                    <Route path='/find' component={Home}>
                        <IndexRoute component={ExploreMusic}/>
                        <Route path='songList' component={SongList}/>
                        <Route path='anchorRadio' component={AnchorRadio}/>
                        <Route path='singers' component={Singers}/>
                        <Route path='latestMusic' component={LatestMusic}/>
                    </Route>
                    
                    //歌单详情的路由配置
                    <Route path='/songList/:id' component={SongListDetail}/>
                    
                    //歌手详情的路由配置 
                    <Route path='/singerInfo/:id' component={SingerInfo}>
                        <IndexRoute component={SingerSongs}/>
                        <Route path='album' component={SingerAlbumsDesc}/>
                        <Route path='mv' component={SingerMVsDesc}/>
                        <Route path='similar' component={SingerSimilar}/>
                        <Route path='intro' component={SingerIntro}/>
                    </Route>

                    //专辑详情的路由配置
                    <Route path='/albumInfo/:id' component={AlbumInfo}/>

                    //排行榜的路由配置
                    <Route path='/rank' component={Rank}/>

                    //排行榜详情的路由配置
                    <Route path='/rankDetail/:id' component={RankDetail}/>

                    //搜索页面路由的详情配置
                    <Route path='/search' component={Search}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
