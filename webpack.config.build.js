const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: ['whatwg-fetch', './src'],
    css: 'tachyons',
  },
  output: {
    path: './dist',
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.ts(x?)$/,
      loader: 'tslint-loader',
      exclude: /node_modules/,
    }, {
      test: /module\.styl/,
      loader: 'style-loader!css-loader?modules!postcss-loader!stylus-loader',
    }, {
      test: /module\.css/,
      loader: 'style-loader!css-loader?modules!postcss-loader',
    }, {
      test: /\.css/,
      exclude: /module\.css/,
      loader: 'style-loader!css-loader!postcss-loader',
    }, {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loader: 'babel-loader!awesome-typescript-loader',
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.json/,
      loader: 'json-loader',
    }, {
      test: /\.(jpg|png)/,
      loader: 'file-loader',
    }, {
      test: /content\/.*\.svg$/,
      loader: 'file-loader',
    }, {
      test: /icons\/.*\.svg$/,
      loader: 'raw-loader!svgo-loader?{"plugins":[{"removeStyleElement":true}]}',
    }, {
      test: /\.md/,
      loader: 'raw-loader',
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      __LAST_UPDATE__: '"' + new Date().toLocaleDateString() + '"',
      __ENABLE_SEGMENT__: true,
      __SEGMENT_TOKEN__: '"7Y6fdaghn7WfoaO3ICKYGDwuZHzV6C52"',
      __GITHUB_OAUTH_CLIENT_ID__: JSON.stringify(process.env.GITHUB_OAUTH_CLIENT_ID.toString()),
      __LAMBDA_AUTH__: JSON.stringify(process.env.LAMBDA_AUTH.toString()),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
    }),
    new HtmlWebpackPlugin({
      favicon: 'static/favicon.png',
      template: 'src/index.html',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          cssnano({
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions'],
            },
            discardComments: {
              removeAll: true,
            },
            safe: true,
          })
        ],
        svgo: {
          plugins: [
            {removeStyleElement: true},
          ],
        },
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  }
}
