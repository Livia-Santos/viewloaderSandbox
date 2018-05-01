import domready from 'domready';
import viewloader from 'viewloader';
import changeBtn from './components/change-btn';
import changeColor from './components/change-color';
import changeBorder from './components/change-border';
import greeting from './components/greeting';
import toggleClass from './components/toggle-class';
import embedMap from './components/embed-map';


import './style.css';

var views = {
  changeBtn,
  changeColor,
  greeting,
  toggleClass,
  embedMap
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
