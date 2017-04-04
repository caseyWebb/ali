import { each, map } from 'lodash'
import ko from 'knockout'

// this regex can not be stored in a variable or webpack will throw:
// 
// Critical dependency: require function is used in a way in which dependencies
// cannot be statically extracted
const context = require.context('./', true, /\.\/([^\/_]+)\/index\.js$/)
const bindings = map(context.keys(), (c) => c.match(/\.\/([^\/_]+)\/index\.js$/)[1])

each(bindings, (b) => {
  ko.bindingHandlers[b] = context(b)
})
