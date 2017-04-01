const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

const loaders = {
  style: 'style-loader/useable',
  css: 'css-loader',
  scss: 'sass-loader',
  html: {
    loader: 'html-loader',
    options: {
      removeAttributeQuotes: false,
      minifyJS: false,
      ignoreCustomComments: [/^\s*\/?ko/],
      ignoreCustomFragments: [/{{[^}]+}}/]
    }
  },
  file: {
    loader: 'file-loader',
    options: {
      hash: 'md5',
      digest: 'hex',
      name: '[name]-[hash].[ext]'
    }
  },
  image: {
    loader: 'image-webpack-loader',
    options: {
      bypassOnDebug: true
    }
  },
  babel: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  },
  eslint: {
    loader: 'eslint-loader',
    options: {
      cache: true
    }
  }
}

module.exports = {
  devtool: process.env.NODE_ENV === 'development'
    ? 'inline-source-map'
    : 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [loaders.babel, loaders.eslint]
      },
      {
        test: /\.css$/,
        use: [loaders.style, loaders.css]
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: [loaders.style, loaders.css, loaders.scss]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [loaders.html]
      },
      {
        test: /\.(woff|ttf|eot)$/,
        exclude: /node_modules/,
        use: [loaders.file]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: [loaders.file, loaders.image]
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: process.env.NODE_ENV === 'production',
      debug: process.env.NODE_ENV === 'development'
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [
        new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 100000 }),
        new webpack.optimize.UglifyJsPlugin(),
        new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|ttf|eot|svg)$/,
          threshold: 0,
          minRatio: 1
        })
      ]
      : [])
  ],

  resolve: {
    unsafeCache: /node_modules/,
    modules: [
      'web_modules',
      path.resolve(__dirname, '../node_modules')
    ]
  }
}
