import * as types from '../actionTypes.js'

import {
  saveHistory,
  deleteHistory,
  deleteAllHis,
  loadHis
} from '../../common/js/cache.js'

let initHis = loadHis()

export function searchHistory(state = initHis, action) {
  switch (action.type) {
    case types.SAVE_HISTORY:
      return saveHistory(action.data)

    case types.DELETE_HISTORY:
      return deleteHistory(action.data)

    case types.DELETE_ALL_HISTORY:
      return deleteAllHis()

    default:
      return state
  }
}