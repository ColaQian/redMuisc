import BScroll from 'better-scroll'

export function initScroll(slider) {
  let sli = new BScroll(slider, {
    scrollX: true,
    scrollY: true,
    probeType: 2,
    click: true
  })

  return sli
}