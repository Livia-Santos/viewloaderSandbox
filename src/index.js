import domready from 'domready';
import viewloader from 'viewloader';
import changeBtn from './components/change-btn';
import changeColor from './components/change-color';
import changeBorder from './components/change-border';
import greeting from './components/greeting';
import './style.css';

var views = {
  changeBtn,
  changeColor,
  greeting
};

var scopeViews = {
  changeBorder
}

var includeScope = document.querySelector('.include-scope');
var excludeScope = document.querySelector('.exclude-scope');


domready(() => {
  viewloader.execute(views)
  viewloader.execute(scopeViews, includeScope, true)
  viewloader.execute(scopeViews, excludeScope, false)
})
