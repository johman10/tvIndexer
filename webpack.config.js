const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'assets/javascript/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'assets/dist/javascript'),
    filename: 'app.js'
  }
};
