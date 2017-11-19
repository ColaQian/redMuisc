### 这是一个仿UWP网易云音乐的web实现，技术栈react+redux+webpack

#### 使用方法：
    安装模块：npm install  
    
    开发模式：npm run start  

    打包：npm run build
    
    访问地址：http://localhost:3012/find

 #### 目前实现的主要功能
 
 1. 发现界面: 包含最新歌单，最新音乐，排行榜入口，每日推荐入口(由于需要用户登录才能访问，具体功能暂未实现)，个人FM入口(由于需要用户登录才能访问，具体功能暂未实现)
 
 2. 排行榜界面: 提供官方的新歌榜，原创榜，热歌榜，飙升榜，电音榜，国外的iTunes榜，billboard榜等
 
 3. 歌手界面: 热门歌手总览
 
 4. 歌手详情界面: 点击热门歌手，即可进入歌手详情界面，可查看歌手的热门歌曲，相关专辑，歌手信息介绍
 
 4. 歌单界面: 歌单界面可查看最热歌单合集，并且可以根据标签类型切换歌单类型(电子，民谣，流行等)
 
 5. 歌单详情界面: 歌单详情界面可以查看歌单的具体信息，包括歌单内的歌曲，创建者，创建日期，收藏，评论数，歌单介绍
 
 6. 搜索界面: 对音乐进行搜索，可搜索歌手，单曲，专辑。此外还提供热门搜索，搜索历史选项
 
 7. 播放器界面: 核心功能，可切换mini播放器和normal播放器，可进行播放模式的切换，拖动进度条定位歌曲播放时间，上一曲，下一曲，位置专辑封面的圆盘转动显示，歌词显示，与当前播放歌曲相似歌曲的推荐，收藏歌曲(功能待实现)，音量调节(功能待实现),播放列表(功能待实现)
 
#### 相关页面实现预览

##### 播放器界面

<img src="https://github.com/FCMore/redMuisc/blob/master/netMusicImages/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20171116004747.png" width = "700" height = "300" alt="歌手列表" align=center />


##### 搜索界面

<img src="https://github.com/FCMore/redMuisc/blob/master/netMusicImages/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20171116102148.png" width = "600" height = "300" alt="歌手列表" align=center />


##### 歌单列表

<img src="https://github.com/FCMore/redMuisc/blob/master/netMusicImages/%E6%AD%8C%E5%8D%95%E5%88%97%E8%A1%A8.png" width = "600" height = "300" alt="歌手列表" align=center />


##### 歌手列表

<img src="https://github.com/FCMore/redMuisc/blob/master/netMusicImages/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20171116102144.png" width = "600" height = "300" alt="歌手列表" align=center />
