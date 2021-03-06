'use strict';

const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let rendererConfig = {
  target: 'electron-renderer',
  devtool: '#eval-source-map',
  devServer: { overlay: true },
  entry: {
    renderer: path.join(__dirname, 'app/config/renderer/index.js')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [path.resolve(__dirname, 'app')],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: 'vue-style-loader!css-loader!sass-loader'
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'images/[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      async: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html',
      bundles: ['renderer']
    })
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'app/dist')
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      components: path.join(__dirname, 'app/components'),
      config: path.join(__dirname, 'app/config'),
      models: path.join(__dirname, 'app/models'),
      helpers: path.join(__dirname, 'app/helpers'),
      data: path.join(__dirname, 'app/data'),
      mixins: path.join(__dirname, 'app/mixins'),
      style: path.join(__dirname, 'app/assets/style'),
      fonts: path.join(__dirname, 'app/assets/fonts'),
      test: path.join(__dirname, 'test')
    },
    extensions: ['.js', '.vue', '.css', 'index.js', 'index.vue']
  }
};

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  rendererConfig.devtool = '';

  /**
   * Apply ESLint
   */
  rendererConfig.module.rules.push(
    {
      test: /\.(js|vue)$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: 'eslint-loader'
    }
  );

  rendererConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },

      mangle: false
    })
  );
}

module.exports = rendererConfig;
