class NewSong {
  constructor({
    id,
    singer,
    name,
    album,
    ifHighQuality,
    duration
  }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.ifHighQuality = ifHighQuality
    this.duration = duration
  }
}
//发现音乐页面的最新音乐的歌曲生成函数
export function createSongForExploreNewSong(song) {
  return new NewSong({
    id: song.id,
    name: song.name,
    singer: {
      id: handleSingerId(song.artists),
      name: handleSingerName(song.artists)
    },
    album: {
      id: song.album.id,
      name: song.album.name,
      picUrl: song.album.picUrl
    },
    duration: song.duration / 1000,
    ifHighQuality: song.hMusic ? true : false
  })
}

export function handleSingerName(namesList) {
  let ret = ''
  if (namesList.length > 1) {
    for (let i = 1; i < namesList.length; i++) {
      ret += namesList[i].name + '/'
    }
    return ret.slice(0, ret.length - 1)
  }
  return namesList[0].name
}

function handleSingerId(ids) {
  let ret = []
  if (ids.length > 1) {
    for (let i = 1; i < ids.length; i++) {
      ret.push(ids[i].id)
    }
    return ret
  }
  ret.push(ids[0].id)
  return ret
}