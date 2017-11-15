import {
  commonParams,
  options
} from './config.js'
import axios from 'axios'
import jsonp from '../common/js/jsonp.js'

export function getSongDetail(ids) {
  const url = '/song/detail'

  return axios.get(url, {
    params: {
      ids: ids
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}

export function getSongUrl(id) {
  const url = '/music/url'

  return axios.get(url, {
    params: {
      id
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}

export function getSongLyric(id) {
  const url = '/lyric'

  return axios.get(url,{
    params: {
      id
    }
  }).then((response) =>{
    return Promise.resolve(response.data)
  })
} 

export function getSimiSongs(id) {
  const url = '/simi/song'

  return axios.get(url,{
    params: {
      id
    }
  }).then((response) =>{
    return Promise.resolve(response.data)
  })
}