export function handlePlayTime(time) {
  let intTime = parseInt(time)
  let min = intTime / 60 | 0
  let sec = _handleSecond(intTime % 60)
  return `${min}:${sec}`
}


//处理歌曲的秒数函数
function _handleSecond(sec) {
  let initSec = sec.toString()
  if (initSec.length < 2) {
    return '0' + initSec
  }
  return sec
}