const {app, BrowserWindow} = require('electron');
const ErrorHandler = require('ErrorHandler');
let window;

class ElectronApp {
  constructor (expressAppUrl, error) {
    ErrorHandler.throw(error);

    this.expressAppUrl = expressAppUrl;

    app.on('window-all-closed', function() {
      // quit after last window is closed
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('ready', () => {
      this.createWindow();
    });

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (window === null) {
        this.createWindow();
      }
    });
  }

  createWindow () {
    const electronWindow = {
      height: 768,
      width: 1024,
      'title-bar-style': 'default',
      frame: true,
      show: false
    };

    // create window
    window = new BrowserWindow(electronWindow);

    // Clean resource
    window.on('closed', function() {
      window = null;
    });

    // load url
    window.loadURL(this.expressAppUrl);

    window.webContents.on('did-finish-load', function() {
      window.show();
    });

    window.webContents.on('did-fail-load', function(event, errorCode, errorDescription, validatedURL, isMainFrame) {
      ErrorHandler.throw(errorCode + ' ' + errorDescription + ' ' + validatedURL + ' ' + isMainFrame);
    });

    // Enable dev tools
    window.openDevTools();
  }
}

module.exports = ElectronApp;
