'use strict';

var path = require('path');
var passport = require('../passport');

module.exports = function setRoutes(app) {

  // dropbox oauth
  app.get('/auth/dropbox', passport.authenticate('dropbox-oauth2'));
  app.get('/auth/dropbox/callback', passport.authenticate('dropbox-oauth2', { failureRedirect: '/?failed_login:1'}),
          function(req, res) {
            res.redirect('/?access_token=' + req.user.accessToken);
          }
  );

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'src', 'index.html'));
  });
}
