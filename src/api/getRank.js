import {
  commonParams,
  options
} from './config.js'
import axios from 'axios'
import jsonp from '../common/js/jsonp.js'

export function getRank(idx) {
  const url = '/top/list'

  return axios.get(url, {
    params: {
      idx
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}