export function playCountHandle(count) {
  let num = count.toString().split('.')[0] || count.toString()
  if (num.length > 4) {
    return num.slice(0, num.length - 4) + '万'
  }
  return num
}