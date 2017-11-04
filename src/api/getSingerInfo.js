import {
  commonParams,
  options
} from './config.js'
import axios from 'axios'
import jsonp from '../common/js/jsonp.js'

export function getSingerInfo(id) {
  const url = '/artists'

  return axios.get(url, {
    params: {
      id
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}

export function getSingerAlbums(id, limit, offset) {
  const url = '/artist/album'

  return axios.get(url, {
    params: {
      id,
      limit,
      offset
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}

export function getSimilarSingers(id) {
  const url = '/simi/artist'

  return axios.get(url, {
    params: {
      id
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}