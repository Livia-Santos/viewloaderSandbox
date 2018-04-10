module.exports = function changeBorder(el, borderColor) {
  el.addEventListener('mouseover', function (e) {
    el.style.border = `10px solid ${borderColor}`
  })
  el.addEventListener('mouseout', function (e) {
    el.style.border = '5px solid black'
  })
};
