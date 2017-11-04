import storage from "good-storage"

const LIKE_KEY = "__LIKE__"
const LIKE_LENGTH = 15

export function insertSong(song) {
  let likeList = storage.get(LIKE_KEY, [])

  if (!likeList) {
    let list = [song]
    storage.set(LIKE_KEY, list)
    return list
  } else {
    let plIndex = likeList.findIndex((item) => {
      return item.id === song.is
    })
    if (plIndex === 0) {
      return
    }
    if (plIndex > 0) {
      likeList.splice(plIndex, 1)
    }

    likeList.unshift(song)

    if (likeList.length > LIKE_LENGTH) {
      likeList.pop()
    }

    storage.set(LIKE_KEY, likeList)

    return likeList
  }
}