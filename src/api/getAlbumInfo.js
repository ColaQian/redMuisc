import {
  commonParams,
  options
} from './config.js'
import axios from 'axios'
import jsonp from '../common/js/jsonp.js'

export function getAlbumInfo(id) {
  const url = '/album'

  return axios.get(url, {
    params: {
      id
    }
  }).then((response) =>{
    return Promise.resolve(response.data)
  })
}