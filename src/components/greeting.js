module.exports = function greeting(el, props) {
  el.value = `${props.greeting}, ${props.name}`
}
