
import { getScrollTop } from './offsets'

let scrollTop = 0

export const disableBodyScroll = () => {
  scrollTop = getScrollTop()
  document.body.style.top = `-${scrollTop}px`
  document.body.classList.add('u-body-scroll-lock')
}

export const enableBodyScroll = () => {
  document.body.classList.remove('u-body-scroll-lock')
  document.body.style.top = ''
  window.scrollTo(0, scrollTop)
}
