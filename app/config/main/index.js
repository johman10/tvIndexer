import { app, BrowserWindow } from 'electron';

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080' : `file://${__dirname}/index.html`;

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,

    // Turned on to enable gridLayout
    webPreferences: {
      experimentalFeatures: true,
    }
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // eslint-disable-next-line no-console
  console.log('mainWindow opened');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
