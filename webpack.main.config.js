'use strict';

process.env.BABEL_ENV = 'main';

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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue']
  }
};

module.exports = mainConfig;
