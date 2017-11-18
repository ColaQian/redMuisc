 import * as types from '../actionTypes.js'

 //搜搜页面专用，由于搜搜页面既有搜索历史相关的redux操作，也有将搜到歌曲放入player的操作，需要将这两个action文件合并
 //播放器
 export function setPlayList(playList) {
   return {
     type: types.SET_PLAY_LIST,
     data: playList
   }
 }

 export function setCurrentIndex(index) {
   return {
     type: types.SET_CURRENT_INDEX,
     data: index
   }
 }

 export function setPlayingState(state) {
   return {
     type: types.SET_PLAYING_STATE,
     data: state
   }
 }

 export function setPlayingMode(mode) {
   return {
     type: types.SET_PLAYING_MODE,
     data: mode
   }
 }

 export function setCurrentSong() {
   return {
     type: types.SET_CURRENT_SONG
   }
 }

 export function addSongToPlayList(song) {
   return {
     type: types.ADD_SONG_TO_PLAYLIST,
     data: song
   }
 }

 //搜索历史
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