class Singer{
  constructor({id,singerName,picUrl}) {
    this.id = id
    this.singerName = singerName
    this.picUrl = picUrl
  }
}

export function createSinger(singer) {
  return new Singer({
    id: singer.id,
    singerName: singer.name,
    picUrl: singer.img1v1Url
  })
}