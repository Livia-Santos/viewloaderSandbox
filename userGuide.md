# Viewloader

### Overview

##### What is it?

Viewloader is a JavaScript package for organising view behaviour. It works by matching DOM elements to JavaScript functions through specific data attributes.

In other words, with Viewloader a `data-view-component-name` attribute can be added to an HTML element, becomes the glue between the DOM and the JavaScript .

##### What’s it for?

Viewloader provides a consistent way of bootstrapping each JavaScript component in an app.
It’s not tied to any particular framework, so we can use it with any type of JavaScript component.

It's a good way to organise code, make functions reusable and to trace behavior all the way from the template to a specific JavaScript function.

### How to use it?

1) Install using npm

`% npm install --save viewloader`


2) Add data attributes to the HTML.

Viewloader uses a convention in HTML for mapping DOM nodes to functions, and calls its setup function.

``` HTML
<!-- index.html -->
<div data-view-my-greeting='Your Name'></div>
```
_Viewloader matches camelCased function names into dash-er-ized attributes in your HTML._

3) Create a Viewloader component.

These are plain JavaScript functions that expect a DOM Node and some properties.

``` JavaScript
// greeting.js
emodule.exports = function greeting (el, name) {
  console.log(`Hello, ${name}!`);
}
```

4) Require Viewloader and the components.

Create an object to hold all the components you want to apply.

``` JavaScript
// index.js
var viewloader = require('viewloader');
var greeting = require('./greeting');

var views = {
  greeting: greeting
};
```

5) Initialise Viewloader once the DOM is ready.

``` JavaScript
//index.js
viewloader.execute(views);
```

### API
#### viewloader.execute(views, scope, includeScope)

- views: An object of view functions mapped to data-view-[name] attributes. (Required)

- scope: An element or nodelist to scope the view loader to. (Optional. Defaults to document)

- includeScope: A boolean to indicate if the scoped element should be included in the scoped views. (Optional: Defaults to false)


### Detailed examples

[Interactive example here](https://wwww.viewloaderwebpage.com)

#### Modifying the target element

Let's use viewloader to create an element that can change its own color.

1) Create a viewloader component.

```JavaScript
// change-btn.js
module.exports = function changeBtn(el, color) {
  el.addEventListener('click', function (e) {
    el.style.backgroundColor = color
  })
}
```

2) Require and execute viewloader component, using the domready library to guarantee the DOM state.

```JavaScript
// index.js
import domready from 'domready';
import viewloader from 'viewloader';
import changeBtn from './components/change-btn';

var views = {
  changeBtn,
};

domready(() => viewloader.execute(views))

```

3) Add data attributes int the HTML.

Viewloader components receive the `data-view-component-name` tag values as properties.
You can use that to make reusable components.

```html
  <!-- index.html -->
  <button class="btn-default" data-view-change-btn='#10BFAB'>Change Me</button>
```

####  Modifying other elements

Inside a Viewloader component you can use regular DOM functions to modify other elements.



1) Create a viewloader component

```JavaScript
// change-color.js
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
```

2) Require and execute viewloader component, using the domready library to guarantee the DOM state.

```JavaScript
// index.js
import domready from 'domready';
import viewloader from 'viewloader';
import changeColor from './components/change-color';

var views = {
  changeColor
};

domready(() => viewloader.execute(views))

```

3) Add data attributes int the HTML.

```HTML
<!-- index.html -->
<div class="color-box">
  <div class="box box1" data-view-change-color='#5C526F'>1</div>
  <div class="box box2" data-view-change-color='#7CBB97'>2</div>
  <div class="box box3" data-view-change-color='#E78A37'>3</div>
  <div class="box box4" data-view-change-color='#F05051'>4</div>
  <div class="box box5" data-view-change-color='#5C526F'>5</div>
  <div class="box box6" data-view-change-color='#E4E0C7'>6</div>
  <div class="box box7" data-view-change-color='#D4AE89'>7</div>
  <div class="box box8" data-view-change-color='#CD6C40'>8</div>
  <div class="box box9" data-view-change-color='#414547'>9</div>
  <div class="box box10" data-view-change-color='#10BFAB'>10</div>
</div>
```

#### Using scope

Viewloader execution can be scoped to specific elements, allowing it to be used
only in specific parts of the template.

You can pass in a  `boolean` flag as the third parameter to indicate
if the scope gets included or not in the viewloader execution.

`viewloader.execute(views, scope, boolean)`


##### Including the scoped element
1) Create a viewloader component

``` JavaScript
// change-border.js
module.exports = function changeBorder(el, borderColor) {
  el.addEventListener('mouseover', function (e) {
    el.style.border = `10px solid ${borderColor}`
  })

  el.addEventListener('mouseout', function (e) {
    el.style.border = '5px solid black'
  })
};
```

2) Require and execute viewloader component

```JavaScript
// index.js
import domready from 'domready';
import viewloader from 'viewloader';
import changeBorder from './components/change-border';

var views = {
  changeBorder
}

var scope = document.querySelector('.scope')

domready(() => viewloader.execute(views, scope, true))
```

3) Add data attributes int the HTML.

``` HTML
<!-- index.html -->
<div data-view-change-border=''>Not affected by Viewloader</div>

<div class="scope-main-box scope" data-view-change-border='#10BFAB'>
  initialized by Viewloader

  <div class="scope-inner-box" data-view-change-border='#F05051'>
    initialized by Viewloader
  </div>
</div>
```

##### Excluding the scoped element
1) Create a viewloader component

``` JavaScript
// change-border.js
module.exports = function changeBorder(el, borderColor) {
  el.addEventListener('mouseover', function (e) {
    el.style.border = `10px solid ${borderColor}`
  })

  el.addEventListener('mouseout', function (e) {
    el.style.border = '5px solid black'
  })
};
```

2) Require and execute viewloader component

``` JavaScript
// index.js
import domready from 'domready';
import viewloader from 'viewloader';
import changeBorder from './components/change-border';

var views = {
  changeBorder
}

var scope = document.querySelector('.scope')

domready(() => viewloader.execute(views, scope, false))
```

3) Add data attributes int the HTML.

``` HTML
<!-- index.html -->
<div data-view-change-border=''>Not affected by Viewloader</div>

<div class="scope-main-box scope" data-view-change-border='#10BFAB'>
  not affected by Viewloader

  <div class="scope-inner-box" data-view-change-border='#F05051'>
    initialized by Viewloader
  </div>
</div>
```
