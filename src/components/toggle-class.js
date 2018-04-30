module.exports = function toggleClass (el, props) {

  let triggered = false

  const defaults = {
    event: 'click',
    preventDefault: true,
  }

  const options = Object.assign({}, defaults, props)
  const targets = Array.prototype.slice.call(
    document.querySelectorAll(options.targetSelector)
  )

  // Remove the loadClass on initialisation
  if (options.targetLoadClassName) {
    window.requestAnimationFrame(() => {
      targets.forEach((target) => {
        target.classList.remove(options.targetLoadClassName)
      })
    })
  }

  // Bind to the passed event
  el.addEventListener(options.event, (e) => {
    if (options.preventDefault) {
      e.preventDefault()
    }
    targets.forEach((target) => {
      target.classList.toggle(options.targetToggleClassName)
    })
    if (options.triggerToggleClassName) {
      el.classList.toggle(options.triggerToggleClassName)
    }
    triggered = true
  })

  // Bind a general listener to handle an add or remove action when
  // we blick outside the target
  if (options.onClickOutsideTarget) {
    window.addEventListener('click', (e) => {
      if (el === e.target || el.contains(e.target)) {
        return
      }
      let outsideTarget = true
      targets.forEach((target) => {
        const contains = target !== e.target && target.contains(e.target)
        if (contains) {
          outsideTarget = false
        }
      })
      if (outsideTarget) {
        targets.forEach((target) => {
          // Perform an `.add` or `.remove`
          if (el.offsetParent !== null) { // check the element is visible.
            target.classList[options.onClickOutsideTarget](options.targetToggleClassName)
          }
        })
      }
    })
  }

  // Trigger after timeout
  if (options.triggerAfter) {
    setTimeout(() => {
      if (triggered === false) {
        el[options.event]()
        triggered = true
      }
    }, options.triggerAfter)
  }
}
