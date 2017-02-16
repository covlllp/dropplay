'use strict';

var path = require('path');
var passport = require('../passport');
var express = require('express');

var rootPath = path.join(__dirname, '..', '..', '..');
var srcPath = path.join(rootPath, 'src');

module.exports = function setRoutes(app) {
  // Serve static images
  app.use('/images', express.static(path.join(srcPath, 'images')))

  // dropbox oauth
  app.get('/auth/dropbox', passport.authenticate('dropbox-oauth2'));

  app.get('/auth/dropbox/callback', passport.authenticate('dropbox-oauth2', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/fetch_user', function(req, res) {
    res.json(req.user);
  });

  app.get('/', function(req, res) {
    res.sendFile(path.join(srcPath, 'index.html'));
  });
}
