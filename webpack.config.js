var path = require('path');

var entryPath = './js/main.jsx';
var jsPath = path.join(__dirname, 'js');

module.exports = {
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.scss']
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
