const path = require('path')
const { extend } = require('lodash')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackConfig = require('./webpack.config')

const PROD = process.env.NODE_ENV === 'production'

const src = path.resolve(__dirname, '../src')
const dist = path.resolve(__dirname, '../dist')

const config = extend({}, webpackConfig, {
  entry: path.join(src, 'app.js'),

  output: {
    path: dist,
    filename: 'app.[hash].js',
    chunkFilename: 'app.[id].[chunkHash].js'
  }
})

module.exports = function * (fly) {
  const [vendor] = glob.sync(path.join(dist, 'vendor.*.js'))
  let shared

  yield fly.clear([
    path.join(dist, 'app.*'),
    path.join(dist, 'shared.*'),
    path.join(dist, 'index.html')
  ])

  if (PROD) {
    yield fly.serial(['vendor', 'shared'])

    shared = glob.sync(path.join(dist, 'shared.*.js'))[0]

    config.plugins.push(
      new webpack.DllReferencePlugin({
        context: path.resolve(src, 'web_modules'),
        manifest: require(path.resolve(dist, 'shared.json'))
      }),
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, '../node_modules'),
        manifest: require(path.resolve(dist, 'vendor.json'))
      }),
      new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true
      })
    )
  }

  config.plugins.push(
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.ejs'),
      vendor: path.relative(dist, vendor),
      shared: shared ? path.relative(dist, shared) : ''
    }))

  yield new Promise((resolve, reject) =>
    webpack(config, (err) => err ? reject(err) : resolve()))
}
