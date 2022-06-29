const drag = {
  bind: (el) => {
    const content = el.querySelector('.ant-modal-content')
    const trigger = el.querySelector('.ant-modal-header')
    trigger.style.cursor = 'move'
    trigger.addEventListener('mousedown', (e) => {
      let styles = getComputedStyle(content)
      let oLeft = parseInt(styles.left)
      let oTop = parseInt(styles.top)
      let ox = e.pageX - oLeft
      let oy = e.pageY - oTop
      document.onmousemove = function (e) {
        content.style.left = `${e.pageX - ox}px`
        content.style.top = `${e.pageY - oy}px`
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    })
  }
}

export {drag}

