module.exports = function changeColor(el, color) {
  el.style.backgroundColor = color
  const container = document.querySelector('.color-box')
  el.addEventListener('mouseover', function (e) {
    container.style.backgroundColor = color
  })
  el.addEventListener('mouseout', function (e) {
    container.style.backgroundColor = '#fff'
  })
}
