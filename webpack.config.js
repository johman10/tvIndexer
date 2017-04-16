const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'assets/javascript/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'assets/dist/javascript'),
    filename: '[name].js',
    publicPath: '/assets/javascript'
  },
  devServer: {
    inline: false
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
