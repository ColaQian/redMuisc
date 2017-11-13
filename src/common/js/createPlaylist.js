import {
    formatTime
} from './formatTime.js'
class PlayList {
    constructor({
        commentCount,
        commentThreadId,
        picUrl,
        createTime,
        creatorId,
        creatorName,
        creatorPicUrl,
        description,
        id,
        name,
        playCount,
        shareCount,
        subscribedCount,
        tags,
        songIds
    }) {
        this.commentCount = commentCount
        this.commentThreadId = commentThreadId
        this.picUrl = picUrl
        this.createTime = createTime
        this.creatorId = creatorId
        this.creatorName = creatorName
        this.creatorPicUrl = creatorPicUrl
        this.description = description
        this.id = id
        this.name = name
        this.playCount = playCount
        this.shareCount = shareCount
        this.subscribedCount = subscribedCount
        this.tags = tags
        this.songIds = songIds
    }
}

export function playListDetail(playList) {
    return new PlayList({
        commentCount: playList.commentCount,
        commentThreadId: playList.commentThreadId,
        picUrl: playList.coverImgUrl,
        createTime: formatTime(playList.createTime),
        creatorId: playList.userId,
        creatorName: playList.creator.nickname,
        creatorPicUrl: playList.creator.avatarUrl,
        description: playList.description,
        id: playList.id,
        name: playList.name,
        playCount: playList.playCount,
        shareCount: playList.shareCount,
        subscribedCount: playList.subscribedCount,
        tags: playList.tags,
        songIds: handleSongIds(playList.tracks)
    })
}

function handleSongIds(ids) {
    let ret = []

    ids.forEach((item) => {
        ret.push({
            id: item.id,
            name: item.name,
            singer: {
                id: item.ar[0].id,
                name: item.ar[0].name
            },
            album: {
                id: item.al.id,
                name: item.al.name,
                picUrl: item.al.picUrl
            },
            duration: item.dt / 1000,
            ifHighQuality: item.h ? true : false,
        })
    })

    return ret
}