import {
  combineReducers
} from 'redux'
import {
  setPlayer
} from './player.js'
import {
  singerInfo
} from './singerInfo.js'
import {
  rankInfo
} from './rankInfo.js'

import {
  searchHistory
} from './history.js'

export default combineReducers({
  setPlayer,
  singerInfo,
  rankInfo,
  searchHistory
})