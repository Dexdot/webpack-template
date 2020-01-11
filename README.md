## Build Setup:

```
# Install dependencies:
yarn install

# Server with hot reload at http://localhost:8081/
yarn dev

# Output will be at dist/ folder
yarn build
```

## Project Structure:

- `src/blocks` - pug blocks, mixins
- `src/pages` - pug pages
- `src/templates` - pug templates, mixins/blocks includes
- `src/assets/sass` - base styles for project import to main.sass. Don't forget to import main.sass in `index.js`
- `src/assets/img` - put images here. Don't forget to use correct path: `assets/img/some.jpg`
- `src/assets/sprite` - put svg images for sprite here.
- `src/js` - base scripts for project import to main.js
- `src/index.js` - main project file where you include/import all main files - main.js, main.sass...
- `static/` - folder with extra static assets that will be copied into output folder

<div align="center">
  <h2>Settings:</h2>
</div>

## Main const:

Easy way to move all files.
Default:

```js
const PATHS = {
  // Path to main app dir
  src: path.join(__dirname, '../src'),
  // Path to Output dir
  dist: path.join(__dirname, '../dist'),
  // Path to Second Output dir (js/css/fonts etc folder)
  assets: 'assets/'
};
```

## Customize:

Change any folders (example):

```js
const PATHS = {
  // src must be src
  src: path.join(__dirname, '../src'),
  // dist to public
  dist: path.join(__dirname, '../public'),
  // assets to static
  assets: 'static/'
};
```

## Import only SASS or CSS libs:

```sass
// Sass librarys example:
@import "../../node_modules/spinners/stylesheets/spinners";
// CSS librarys example:
@import "../../node_modules/flickity/dist/flickity.css";
```

## Import js files:

1. Create another js module inside `~/js/` dir
2. Import modules in `~/js/main.js` file

```js
// another js file for example
import '~/js/example.js';
```

## PUG Dir Folder:

#### Default:

- .pug dir: `./src/pages/`
- Configurations: in `./webpack-config/webpack.base.conf.js`

```js
const PAGES_DIR = PATHS.src;
```

**Usage:**
All files must be created in the `./src/pages/` folder.
Example:

```bash
./src/pages/index.pug
./src/pages/about.pug
```

#### Change PUG Default Dir Folder:

Example for `./src/example`:

1. Create folder for all pug page files in `./src`. Be like: `./src/example`
2. Change `./webpack-config/webpack.base.conf.js` const PAGES_DIR:

```js
// Old path
// const PAGES_DIR = PATHS.src

// Your new path
const PAGES_DIR = `${PATHS.src}/example`;
```

3. Rerun webpack dev server

**Usage:**
All files must be created in the `./src/example` folder.
Example:

```bash
./src/example/index.pug
./src/example/about.pug
```

## Vue install:

1. Install vue

```bash
yarn add vue
```

2. Init vue

```js
const app = new Vue({
  el: '#app'
});
```

3. Create div id app

```html
<div id="app">
  <!-- content -->
</div>
```

## Vuex install:

1. Install vuex

```bash
yarn add vuex
```

2. Import Vuex

```js
import store from '~/store';
```

3. Create store.js

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  // vuex content
});
```

## Add Vue Components:

Create your component in `/components/`

**HTML Usage:**

1. Init component

```js
Vue.component('example-component', require('~/components/Example.vue').default);
```

2. Any html files:

```html
<example-component />
```

**VUE Usage:**

1. import components in .vue:

```js
import example from '~/components/Example.vue';
```

2. Register component:

```js
components: {
  example;
}
```

3. Init in vue component:

```html
<example />
```
