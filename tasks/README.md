# Building

The client is built using [Webpack](https://webpack.js.org) and [Fly](https://github.com/flyjs/fly), with build commands
exposed via npm run scripts (the `"scripts"` property in [package.json](../package.json)).

# yarn dev

Builds for development. Prioritizes speed and ease-of-development over file size.

# yarn prod

Builds for production

  - Uses Vendor DLL contaning [node_modules](../node_modules)
  - Uses Common DLL containing [web_modules](../src/web_modules)
  - Transpile to ES5 ([Babel](https://babeljs.io/))
  - Minify HTML, JS, and CSS
  - [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)
  - [MinChunkSizePlugin](https://webpack.js.org/plugins/min-chunk-size-plugin/)

# yarn start

Starts the [webpack-dev-server](https://webpack.js.org/configuration/dev-server/#components/sidebar/sidebar.jsx).
Using the dev server is *highly recommended* as it gives you linting and build
output in the console (and optionally an overlay) as well as near instantaneous
rebuilds since assets are stored and served from memory. For all intents and purposes,
this replaces a "watch" task.

You may need to configure proxying to your backend API. For more on how to do this,
see the commented `proxy` section in [./serve.js](./serve.js) and the [dev server proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy)
documentation.
