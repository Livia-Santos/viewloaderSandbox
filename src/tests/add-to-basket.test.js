const addToBasket = require("../components/add-to-basket.js");

test("addToBasket function exists", () => {
  expect(addToBasket).toBeDefined();
});

beforeEach(() => {
  document.body.innerHTML = `<div class="product">
    <img src="./src/img/book3.jpg" alt="Harry Potter and Prisoner of Azkaban cover">
    <button class="btn-default" data-view-add-to-basket='{"file":"./src/data/product3.html", "target":"output"}'>Add Book</button>
  </div>
    <h2> My Basket </h2>
  <div class="output"> </div>`;

  const mockResponse = {
    text: () => {
      return "Some sample text";
    }
  };
  window.fetch = jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockResponse));

  const el = document.querySelector(".btn-default");
  const props = {
    file: "./src/data/product3.html",
    target: "output"
  };
  addToBasket(el, props);

  el.click();
});

test("Add an product after on click event", () => {
  const container = document.querySelector(".output");
  expect(container.childElementCount).toBe(1);
});
