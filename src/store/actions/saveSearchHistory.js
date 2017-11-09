import * as types from '../actionTypes.js'

export function saveSearchHistory(item) {
  return {
    type: types.SAVE_HISTORY,
    data: item
  }
}

export function deleteHistory(item) {
  return {
    type: types.DELETE_HISTORY,
    data: item
  }
}

export function deleteAllHistory() {
  return {
    type: types.DELETE_ALL_HISTORY
  }
}