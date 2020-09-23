function pressAndLongPress(Vue) {
  let isLongPressed = false
  Vue.directive('longpress', {
    bind: function (el, binding, vNode) {
      isLongPressed = false

      if (typeof binding.value !== 'function') {
        const compName = vNode.context.name
        let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `
        if (compName) {
          warn += `Found in component '${compName}' `
        }

        console.warn(warn)
      }

      let pressTimer = null
      const start = (e) => {
        if (e.type === 'click' && e.button !== 0) {
          return
        }

        if (pressTimer === null) {
          pressTimer = setTimeout(() => {
            isLongPressed = true
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            handler(e)
          }, 1000)
        }
      }

      const cancel = (e) => {
        if (pressTimer !== null) {
          clearTimeout(pressTimer)
          pressTimer = null
        }
      }

      const handler = (e) => {
        binding.value(e)
      }

      el.addEventListener("mousedown", start)
      el.addEventListener("touchstart", start)

      el.addEventListener("click", cancel)
      el.addEventListener("mouseout", cancel)
      el.addEventListener("touchend", cancel)
      el.addEventListener("touchcancel", cancel)
    }
  })

  Vue.directive('press', {
    bind: function (el, binding, vNode) {
      if (typeof binding.value !== 'function') {
        const compName = vNode.context.name
        let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `
        if (compName) {
          warn += `Found in component '${compName}' `
        }

        console.warn(warn)
      }

      function start(e) {
        if (e.type === 'touchend') {
          isLongPressed = false
          return
        }

        if (!isLongPressed) {
          binding.value(e)
        } else {
          isLongPressed = false
        }
      }

      el.addEventListener("click", start)
      el.addEventListener("touchend", start)
      el.addEventListener("touchcancel", start)
    }
  })
}

export default pressAndLongPress
