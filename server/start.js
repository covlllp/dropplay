'use strict';

var Promise = require('bluebird');
var chalk = require('chalk');
var server = require('http').createServer();

var createApplication = new Promise(function(resolve, reject) {
  var app = require('./app');
  server.on('request', app);
  resolve();
});

function startServer() {
  var PORT = process.env.PORT || 3000;
  server.listen(PORT, function() {
    console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
  });
}

createApplication.then(startServer).catch(function(err) {
  console.error('Initialization error: ', chalk.red(err.message));
});
