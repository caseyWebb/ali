/**
 * This will fetch components on-demand. It can be nice for lowering the initial
 * page load, however it will cause page jarring as the components are loaded and
 * rendered. To fix this, use `import 'components/foo'` in your views for shared
 * components that appear above the fold, or use a plugin to preload specified
 * shared components using ko.components.get(componentName).
 *
 * In my experience, it is better to bite the bullet on initial page load, but
 * that's just me.
 */

import { each, extend, map } from 'lodash-es'
import ko from 'knockout'

// this regex can not be stored in a variable or webpack will throw:
//
// Critical dependency: require function is used in a way in which dependencies
// cannot be statically extracted
const context = require.context('./', true, /\.\/([^\/_]+)\/index\.js$/)
const components = map(context.keys(), (c) => c.match(/\.\/([^\/_]+)\/index\.js$/)[1])

// enable custom element syntax
// see: http://knockoutjs.com/documentation/component-loaders.html#note-custom-component-loaders-and-custom-elements
each(components, (c) => {
  ko.components.register(c, {})
})

ko.components.loaders.unshift({
  getConfig(name, done) {
    import(`./${name}/index.js`)
      .then((config) => done(extend({}, config, { synchronous: true })))
      .catch(() => done(null))
  }
})
