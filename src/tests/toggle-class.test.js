const toggleClass = require('../components/toggle-class');

test('Change className and display content', () => {
  // monta um html falso com tudo que teria na pagina relevante ao teste
  document.body.innerHTML =
    `<div class="container toggle-test">
        <button class="btn-default">Toggle Me</button>
        <div class="toggle-nav-test"></div>
      </div>`;

  // busca do html falso o elemento
  const el = document.querySelector('.btn-default');

  const props = {
    "event":"click",
    "onClickOutsideTarget":"add",
    "targetSelector":".toggle-nav-test",
    "targetToggleClassName":"show"
  }

  // chama a funcao do viewloader
  toggleClass(el, props);

  //simular um onClick
  el.click();
  const targetElement = document.querySelector('.toggle-nav-test')

  expect(targetElement.className).toBe("toggle-nav-test show");
});
