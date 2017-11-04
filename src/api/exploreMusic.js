import {
  commonParams,
  options
} from './config.js'
import axios from 'axios'
import jsonp from '../common/js/jsonp.js'


export function getBanner() {
  const url = "/banner"

  return axios.get(url).then((response) => {
    return Promise.resolve(response.data)
  })
}

export function getRecommendSongList() {
  const url = '/personalized'

  return axios.get(url).then((response) => {
    return Promise.resolve(response.data)
  })
}

export function getLatestMusic() {
  const url = '/personalized/newsong'

  return axios.get(url).then((response) => {
    return Promise.resolve(response.data)
  })
}

export function getRecommendDjProgram() {
  const url = '/personalized/djprogram'

  return axios.get(url).then((response) => {
    return Promise.resolve(response.data)
  })
}