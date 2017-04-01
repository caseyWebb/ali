const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

const dist = path.resolve(__dirname, '../dist')

const config = {
  entry: {
    vendor: [
      'jquery',
      'knockout',
      'knockout-punches',
      'ko-component-router',
      'ko-contrib-fns',
      'ko-contrib-utils',
      'ko-querystring',
      'lodash'
    ]
  },

  output: {
    path: dist,
    filename: 'vendor.[hash].js',
    library: 'VENDOR'
  },

  devtool: 'source-map',

  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(dist, 'vendor.json'),
      name: 'VENDOR',
      context: path.resolve(__dirname, '../node_modules')
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|ttf|eot|svg)$/,
      threshold: 0,
      minRatio: 1
    })
  ]
}

module.exports = function * (fly) {
  yield fly.clear(path.join(dist, 'vendor.*'))
  yield new Promise((resolve, reject) =>
    webpack(config, (err) => err ? reject(err) : resolve()))
}
