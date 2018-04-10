module.exports = function changeBtn(el, color) {
  el.addEventListener('click', function (e) {
    el.style.backgroundColor = color
  })
}
