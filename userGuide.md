# Viewloader

Viewloader is teensy package that simplifies the process of binding DOM nodes to JavaScript functions. It does this by creating a convention for mapping between the DOM and your JS and ensures that _only_ the functions for the components in the DOM are executed.

Let’s create a "Hello, World!" component:

```HTML
// Add a `data-view-*` attribute
<input data-view-hello-world>

<script>
  import viewloader from "viewloader";
  // Create an object to hold our views
  const views = {
    // Create a camelCased key matching the dasherized data-view-hello-world
    // from our HTML: data-view-hello-world -> helloWorld
    helloWorld: (el, props) => {
      // The DOM node is passed here as `el` so we can do stuff!
      el.value = "Hello, World!";
    }
  }
  // Call viewloader with our "views" object whenever the DOM is ready
  viewloader.execute(views);

</script>
```

This simple approach:

* Lets you stop worrying about if your JS is going to be called — if there’s a `data-view-*` in the DOM it will be.
* Establishes a clear convention for binding JS to the DOM — makes it easy to find where in your codebase behaviour is originating from.
* Encourages (though doesn’t force) you to encapsulate behaviour within the context of a component’s DOM node.

💅🏽 Viewloader has one extra trick up its sleeve that makes it an incredibly powerful pattern: the value of the `data-view-*` attribute will be passed to your matching JS function as a second argument.

``` HTML
<input data-view-hello-world="Angela Merkel">

<script>
  import viewloader from "viewloader";

  const views = {
    helloWorld: (el, name) => {
      // Our attribute is available here!
      el.value = `Hello, ${name}!`;
    }
  }

  viewloader.execute(views);

</script>
```

And for additional ✨ it’ll parse JSON-encoded values from that attribute into a proper object for you:

```HTML
<input
    data-view-hello-world="{"greeting":\"Guten tag",\"name\":\"Angela Merkel\"}">

<script>
  import viewloader from "viewloader";

  const views = {
    helloWorld: (el, props) => {
      // Our attribute is available here!
      el.value = `${props.greeting}, ${props.name}!`;
    }
  }

  viewloader.execute(views);

</script>
```

This gives you the power to create reusable components that can be "called" from your HTML with their own properties.

[Needs sentence to wrap up and point to examples]

* It’s just plain JavaScript
* No restrictions on what you can do, but no checks on what you do (so be careful!)

### Installation

* Using npm
* Using yarn
* Using unpkgd (we’ll need to add a built file for this)

### API
#### viewloader.execute(views, scope, includeScope)

- views: An object of view functions mapped to data-view-[name] attributes. (Required)

- scope: An element or nodelist to scope the view loader to. (Optional. Defaults to document)

- includeScope: A boolean to indicate if the scoped element should be included in the scoped views. (Optional: Defaults to false)


### Detailed examples

#### Show the power of per-instance props

* Create a viewloader component

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

* Require and execute viewloader component, using the domready library to guarantee the DOM state.

```JavaScript
// index.js
import domready from 'domready';
import viewloader from 'viewloader';
import changeColor from './components/change-color';

var views = {
  changeColor
}

domready(() => viewloader.execute(views))

```

* Add data attributes int the HTML.

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
* Create a viewloader component

``` JavaScript
// change-border.js
module.exports = function changeBorder(el, borderColor) {
  el.addEventListener('mouseover', function (e) {
    el.style.border = `10px solid ${borderColor}`
  })

  el.addEventListener('mouseout', function (e) {
    el.style.border = '5px solid black'
  })
}
```

* Require and execute viewloader component

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

* Add data attributes int the HTML.

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
* Create a viewloader component

``` JavaScript
// change-border.js
module.exports = function changeBorder(el, borderColor) {
  el.addEventListener('mouseover', function (e) {
    el.style.border = `10px solid ${borderColor}`
  })

  el.addEventListener('mouseout', function (e) {
    el.style.border = '5px solid black'
  })
}
```

* Require and execute viewloader component

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

* Add data attributes int the HTML.

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
