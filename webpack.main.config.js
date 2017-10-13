'use strict';

const path = require('path');
const webpack = require('webpack');

let mainConfig = {
  target: 'electron-main',
  entry: {
    main: path.join(__dirname, 'app/config/main/index.js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'app/dist')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },

      mangle: false
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      config: path.join(__dirname, 'app/config'),
      helpers: path.join(__dirname, 'app/helpers'),
      models: path.join(__dirname, 'app/models')
    }
  }
};

module.exports = mainConfig;
