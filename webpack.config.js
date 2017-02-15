var path = require('path');

var entryPath = './src/js/main.jsx';
var jsPath = path.join(__dirname, 'src', 'js');

module.exports = {
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.jsx']
  },
  entry: entryPath,
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: jsPath,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: jsPath,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};
