import * as types from '../actionTypes.js'

export function setSingerHotSongs(songs) {
  return {
    type: types.SET_SINGER_HOT_SONGS,
    data: songs
  }
}

export function setSingerAlbums(albums) {
  return {
    type: types.SET_SINGER_ALBUMS,
    data: albums
  }
}

export function setSingerMVs(mvs) {
  return {
    type: types.SET_SINGER_MVS,
    data: mvs
  }
}

export function setSingerDesc(desc) {
  return {
    type: types.SET_SINGER_DESC,
    data: desc
  }
}

export function setSingerSimilar(sim) {
  return {
    type: types.SET_SINGER_SIMILAR,
    data: sim
  }
}