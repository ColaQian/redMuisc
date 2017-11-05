import * as types from '../actionTypes.js'

export function setRankBaseInfo(info) {
  return {
    type: types.RANK_BASE_INFO,
    data: info
  }
}

export function setRankSongs(songs) {
  return {
    type: types.RANK_SONGS,
    data: songs
  }
}