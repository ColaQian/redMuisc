import * as types from '../actionTypes.js'
import {
  playingMode
} from '../../common/js/config.js'

const initState = {
  playingMode: playingMode.loopList,
  playingState: false,
  playList: [],
  currentIndex: -1,
  currentSong: null
}


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

    case types.ADD_SONG_TO_PLAYLIST: 
      let ret = addSongToPlayList(state.playList,action.data)
      return Object.assign({},state,{
        playList: ret
      })

    default:
      return state
  }
}

function addSongToPlayList(list, song) {
  let findex = list.findIndex((item) =>{
    return item.id === song.id
  })

  if(findex < 0) {
    list.push(song)
    return list
  }

  list.splice(findex,1)
  list.push(song)
  return list
}