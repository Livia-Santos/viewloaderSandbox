module.exports = function ajaxRequest(el, props) {

  el.addEventListener("click", function() {
    fetch(props.file)
      .then((res) => res.json())
      .then((data) => {
        const wrapper = document.createElement('div');
        let text = `
          <p>ID:${data[props.productNumber].id}</p>
          <p>Title:${data[props.productNumber].title}</p>
          <p>Author:${data[props.productNumber].author}</p>
          <hr/>
        `
        wrapper.innerHTML = text
        const container = document.querySelector(`.${props.target}`);
        container.appendChild(wrapper);
      })
      .catch((err) => console.log(err));
  });
};
