const path = require('path')
const { extend } = require('lodash')
const glob = require('glob')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const src = path.resolve(__dirname, '../src')
const dist = path.resolve(__dirname, '../dist')
const shared = glob.sync(path.join(src, 'web_modules/**/*.@(js|html|scss|woff|otf|ttf|eot|jpe?g|png|gif|svg)'))

const config = extend({}, webpackConfig, {
  entry: {
    shared
  },

  output: {
    path: dist,
    filename: 'shared.[hash].js',
    library: 'SHARED'
  },

  devtool: 'source-map',

  plugins: [
    ...webpackConfig.plugins,
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '../node_modules'),
      manifest: require(path.resolve(dist, 'vendor.json'))
    }),
    new webpack.DllPlugin({
      path: path.resolve(dist, 'shared.json'),
      name: 'SHARED',
      context: path.resolve(src, 'web_modules')
    })
  ]
})

module.exports = function * () {
  yield new Promise((resolve, reject) =>
    webpack(config, (err) => err ? reject(err) : resolve()))
}
