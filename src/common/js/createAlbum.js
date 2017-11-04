import {
  formatTime
} from './formatTime.js'
class Album {
  constructor({
    id,
    name,
    creatorName,
    creatorId,
    publishTime,
    picUrl,
    desc
  }) {
    this.id = id
    this.name = name
    this.creatorName = creatorName
    this.creatorId = creatorId
    this.publishTime = publishTime
    this.picUrl = picUrl
    this.desc = desc
  }
}

export function createAlbum(item) {
  return new Album({
    id: item.id,
    name: item.name,
    creatorName: item.artist.name,
    creatorId: item.artist.id,
    publishTime: formatTime(item.publishTime),
    picUrl: item.picUrl,
    desc: item.description
  })
}