'use strict';

require('app-module-path').addPath(__dirname + '/helpers');
require('app-module-path').addPath(__dirname + '/models');
require('app-module-path').addPath(__dirname + '/controllers');
const Hapi = require('hapi');
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: __dirname
      }
    }
  }
});
const database = require('./config/database');
const ejs = require('ejs');
const {app, BrowserWindow} = require('electron');
var window;
const Inert = require('inert');
const Event = require('event');
var plugins = [Inert, Event];

server.connection({ port: 3000 });
setupLogging();
database(server);
setupViewEngine();

server.register(plugins, function(error) {
  if (error) {
    console.log(error);
  }

  server.views({
    engines: { ejs: ejs },
    relativeTo: __dirname,
    path: 'views'
  });

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);

    app.on('window-all-closed', function() {

      // quit after last window is closed
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('infoNotification', function() {
      console.log('test');
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
  });
});

function startElectron() {
  const electronWindow = {
    height: 768,
    width: 1024,
    'title-bar-style': 'default',
    frame: true,
    show: false
  };

  app.on('quit', function() {
    var p = server.db.connection.close();
    p.then(function() {
    }).error(function(err) {
      // process the error
    });
  });

  // create window
  window = new BrowserWindow(electronWindow);

  // load url
  window.loadURL(server.info.uri);

  window.webContents.on('did-finish-load', function(event) {
    window.show();
  });

  window.webContents.on('did-fail-load', function(event, errorCode, errorDescription, validatedURL, isMainFrame) {
    console.log(errorCode + ' ' + errorDescription + ' ' + validatedURL + ' ' + isMainFrame);
  });

  // Clean resource
  window.on('closed', function() {
    window = null;
  });

  // Enable dev tools
  window.openDevTools();
}

function setupLogging() {
  const good = require('good');
  const loggingOptions = {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          log: '*',
          response: '*',
          error: '*',
          request: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  };

  plugins.push({
    register: good,
    options: loggingOptions,
  });
}

function setupViewEngine() {
  const routes = require('./config/routes/routes');
  const vision = require('vision');

  plugins.push(vision);
  server.route(routes);
}
