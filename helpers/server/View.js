const NODE_ENV = process.env.NODE_ENV;
const morgan = require('morgan');
const express = require('express');
const proxy = require('http-proxy-middleware');

class View {
  constructor (expressApp) {
    const baseRoutes = require('config/routes/base-routes');
    const movieRoutes = require('config/routes/movie-routes');

    // Define logging module
    expressApp.use(morgan('dev'));

    // Define routes
    expressApp.use('/', baseRoutes);
    expressApp.use('/movies', movieRoutes);
    if (NODE_ENV === 'production') {
      expressApp.use('/assets', express.static('assets/dist'));
    } else {
      expressApp.use('/assets', proxy({ target: 'http://localhost:8080', changeOrigin: true }));
    }

    // Define a view engine
    expressApp.set('view engine', 'pug');
  }
}

module.exports = View;
