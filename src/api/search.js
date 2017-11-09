import {
  commonParams,
  options
} from './config.js'
import axios from 'axios'
import jsonp from '../common/js/jsonp.js'

export function getKeySong() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: 1503203449772,
    format: 'jsonp'
  })

  return jsonp(url, data, options)
}

//type为搜索的类型，1:单曲  10:专辑  100:歌手  1000:歌单  1002:用户  1004:MV   1006:歌词  1009:电台  
export function search(keywords, limit, offset, type) {
  const url = '/search'

  return axios.get(url, {
    params: {
      keywords,
      limit,
      offset,
      type
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}

export function multiSearch(keywords) {
  const url = '/search/multimatch'

  return axios.get(url, {
    parmas: {
      keywords
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}