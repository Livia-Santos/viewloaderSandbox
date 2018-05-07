const viewloader = require("viewloader");

module.exports = function addToBasket(el, props) {
  function remove(el) {
    el.addEventListener("click", function() {
      el.parentNode.remove();
    });
  }

  const container = document.querySelector(`.${props.target}`);

  el.addEventListener("click", function() {
    fetch(props.file)
      .then(res => res.text())
      .then(data => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = data;
        container.appendChild(wrapper);
        viewloader.execute({ remove }, wrapper, true);
      })
      .catch(err => console.log(err));
  });
};
