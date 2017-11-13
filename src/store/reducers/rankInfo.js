import * as types from '../actionTypes.js'
const initState = {
  songs: []
}

export function rankInfo(state = initState, action) {
  switch (action.type) {
    case types.RANK_BASE_INFO:
      return {
        ...state,
        ...action.data
      }

    case types.RANK_SONGS:
      return {
        ...state,
        songs: action.data
      }

    default:
      return state
  }
}