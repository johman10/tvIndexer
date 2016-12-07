'use strict';

require('app-module-path').addPath(__dirname + '/helpers');
require('app-module-path').addPath(__dirname + '/models');
require('app-module-path').addPath(__dirname + '/controllers');
const express = require('express');
const server = express();
const {app, BrowserWindow} = require('electron');
var window;
const ErrorHandler = require('ErrorHandler');
const serverPort = 3000;
const serverHost = 'localhost';
const serverUrl = 'http://' + serverHost + ':' + serverPort;
server.set('view engine', 'ejs');

setupViewEngine();

server.listen(serverPort, 'localhost', function (error) {
  new ErrorHandler().throw(error);

  app.on('window-all-closed', function() {

    // quit after last window is closed
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('ready', function() {
    startElectron();
  });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (window === null) {
      startElectron();
    }
  });

  console.log('Server running at: http://' + serverHost + ':' + serverPort);
});

function startElectron() {
  const electronWindow = {
    height: 768,
    width: 1024,
    'title-bar-style': 'default',
    frame: true,
    show: false
  };

  // create window
  window = new BrowserWindow(electronWindow);

  // load url

  window.loadURL(serverUrl);

  window.webContents.on('did-finish-load', function(event) {
    window.show();
  });

  window.webContents.on('did-fail-load', function(event, errorCode, errorDescription, validatedURL, isMainFrame) {
    new ErrorHandler(null, errorCode + ' ' + errorDescription + ' ' + validatedURL + ' ' + isMainFrame);
  });

  // Clean resource
  window.on('closed', function() {
    window = null;
  });

  // Enable dev tools
  window.openDevTools();
}

function setupViewEngine() {
  const baseRoutes = require('./config/routes/base-routes');
  const movieRoutes = require('./config/routes/movie-routes');
  server.use('/', baseRoutes);
  server.use('/movies', movieRoutes);
  server.engine('html', require('ejs').renderFile);
}
