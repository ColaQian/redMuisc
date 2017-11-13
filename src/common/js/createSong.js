class Song {
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
export function createSong(song) {
  return new Song({
    id: song.id,
    name: song.name,
    album: {
      id: song.al.id,
      name: song.al.name,
      picUrl: song.al.picUrl
    },
    singer: {
      id: song.ar[0].id,
      name: song.ar[0].name
    },
    ifHighQuality: song.h ? true : false,
    duration: song.dt / 1000
  })
}

/*function filterSinger(singer) {
  let singers = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    singers.push(s.name)
  })
  return singers.join('/')
}*/