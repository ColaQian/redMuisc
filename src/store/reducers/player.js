import * as types from '../actionTypes.js'
import {
  insertSong
} from '../../common/js/cache.js'
const initState = {}


export function setPlayer(state = initState, action) {
  switch (action.type) {
    case types.SET_PLAY_LIST:
      return Object.assign({}, state, {
        playList: action.data
      })

    case types.SET_CURRENT_INDEX:
      return Object.assign({}, state, {
        currentIndex: action.data
      })

    case types.SET_PLAYING_STATE:
      return Object.assign({}, state, {
        playingState: action.data
      })

    case types.SET_PLAYING_MODE:
      return Object.assign({}, state, {
        playingMode: action.data
      })

    case types.SET_CURRENT_SONG:
      return Object.assign({}, state, {
        currentSong: state.playList[state.currentIndex]
      })

    default:
      return state
  }
}