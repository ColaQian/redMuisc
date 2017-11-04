import {
  commonParams,
  options
} from './config.js'
import axios from 'axios'
import jsonp from '../common/js/jsonp.js'

export function getPlayList(type, count) {
  const url = '/top/playlist/highquality'

  return axios.get(url, {
    params: {
      cat: type,
      limit: count
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}

export function getPlayListDetail(id) {
  const url = '/playlist/detail'

  return axios.get(url,{
    params: {
      id: id
    }
  }).then((response) =>{
    return Promise.resolve(response.data)
  })
}