import * as types from '../actionTypes.js'
const initState = {}

export function singerInfo(state=initState,action) {
  switch(action.type){
    case types.SET_SINGER_HOT_SONGS:
      return Object.assign({},state,{
        hotSongs: action.data
      })

    case types.SET_SINGER_ALBUMS:
      return Object.assign({},state,{
        singerAlbums: action.data
      })

    case types.SET_SINGER_MVS:
      return Object.assign({},state,{
        singerMVs: action.data
      })

    case types.SET_SINGER_DESC:
      return Object.assign({},state,{
        singerDesc: action.data
      })

    case types.SET_SINGER_SIMILAR:
    return Object.assign({}, state, {
      singerSimilar: action.data
    })

    default: 
      return state
  }
} 
