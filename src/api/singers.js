import {
  commonParams,
  options
} from './config.js'
import axios from 'axios'
import jsonp from '../common/js/jsonp.js'

export function getSingers(offset, limit) {
  const url = '/top/artists'

  return axios.get(url, {
    params: {
      offset,
      limit
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}