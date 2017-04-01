const { extend } = require('lodash')
const path = require('path')
const { yellow } = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')

const src = path.resolve(__dirname, '../src')
const dist = path.resolve(__dirname, '../dist')

const config = extend({}, webpackConfig, {
  entry: {
    app: [
      path.join(src, 'app.js'),
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server'
    ]
  },

  output: {
    path: dist,
    publicPath: '/',
    filename: 'app.[hash].js',
    chunkFilename: 'app.[id].[chunkHash].js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = function * (fly) { // eslint-disable-line require-yield

  new WebpackDevServer(webpack(config), {
    // use this instead of `noInfo` or `quiet` so rebuilds are logged
    stats: {
      assets: false,
      chunks: false,
      hash: false,
      modules: false,
      version: false
    },

    contentBase: dist,
    publicPath: '/',
    inline: true,
    hot: true,
    overlay: {
      errors: true
    },

    // disable if using hashbang routing
    historyApiFallback: true,

    // if using an API on the same host and port, use this to proxy requests to
    // your backend server
    // proxy: {
    //   '/api': {
    //     target: 'localhost:8080/api',
    //     changeOrigin: true,
    //     headers: { 'x-dev-server': 'yes' }
    //   }
    // }
  })
    .listen(8080, '0.0.0.0', (err) => {
      if (err) {
        throw new Error(err)
      }
      fly.$.log('running on http://0.0.0.0:8080')
      fly.$.log(yellow('NOTE: In order to prevent a redirect to the proxy url you must append the trailing `/`. This is not a bug.'))
    })
}
