import {
  combineReducers
} from 'redux'
import {
  setPlayer
} from './player.js'
import {
  singerInfo
} from './singerInfo.js'

export default combineReducers({
  setPlayer,
  singerInfo
})