import storage from "good-storage"

const SEARCH_KEY = "_SEARCH_"
const SEARCH_LENGTH = 15

function findIndex(arr, val, compare, maxLen) {
  let plIndex = arr.findIndex(compare)

  if (plIndex === 0) {
    return
  }

  if (plIndex > 0) {
    arr.splice(plIndex, 1)
  }

  arr.unshift(val)

  if (maxLen && arr.length > SEARCH_LENGTH) {
    arr.pop()
  }
}

export function saveHistory(query) {
  let his = storage.get(SEARCH_KEY, [])
  findIndex(his, query, (item) => {
    return item === query
  }, SEARCH_LENGTH)

  storage.set(SEARCH_KEY, his)

  return his
}

export function loadHis() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteHistory(query) {
  let his = storage.get(SEARCH_KEY, [])
  let index = his.findIndex((item) => {
    return item === query
  })

  his.splice(index, 1)
  storage.set(SEARCH_KEY, his)

  return his
}

export function deleteAllHis() {
  storage.remove(SEARCH_KEY)

  return []
}