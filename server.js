'use strict';

require('app-module-path').addPath(__dirname);
require('app-module-path').addPath(__dirname + '/helpers');
require('app-module-path').addPath(__dirname + '/models');
require('app-module-path').addPath(__dirname + '/controllers');
const expressApp = require('express')();
const Socket = require('server/Socket');
const View = require('server/View');
const ElectronApp = require('server/ElectronApp');
const expressAppPort = 3000;
const expressAppHost = 'localhost';
const expressAppUrl = 'http://' + expressAppHost + ':' + expressAppPort;

new Socket(expressApp);
new View(expressApp);

expressApp.listen(expressAppPort, 'localhost', function (error) {
  new ElectronApp(expressAppUrl, error);
  console.log('expressApp running at: ' + expressAppUrl);
});
