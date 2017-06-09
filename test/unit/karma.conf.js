const webpack = require('webpack');

const baseConfig = require('../../webpack.renderer.config');

// Set BABEL_ENV to use proper preset config
process.env.BABEL_ENV = 'test';

let webpackConfig = Object.assign(baseConfig, {
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"testing"'
    })
  ]
});

// don't treat dependencies as externals
delete webpackConfig.entry;
delete webpackConfig.externals;
delete webpackConfig.output.libraryTarget;

// apply vue option to apply isparta-loader on js
webpackConfig.module.rules
  .find(rule => rule.use.loader === 'vue-loader').use.options.loaders.js = 'babel-loader';

module.exports = config => {
  config.set({
    browsers: ['Electron'],
    client: {
      useIframe: false
    },
    frameworks: ['mocha', 'chai'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack']
    },
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
