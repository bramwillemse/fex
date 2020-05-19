
export const getScrollTop = () => {
  const htmlScrollTop = document.querySelector('html').scrollTop
  const bodyScrollTop = document.body.scrollTop

  return htmlScrollTop > bodyScrollTop ? htmlScrollTop : bodyScrollTop
}
