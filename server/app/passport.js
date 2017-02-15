'use strict';

var fs = require('fs');
var path = require('path');
var passport = require('passport');
var PassportDropbox = require('passport-dropbox-oauth2');
var DropboxStrategy = PassportDropbox.Strategy;

var secrets = require('../secrets');

var Users = {
  filename: path.join(__dirname, 'users.json'),

  loadAllUsers: function loadAllUsers() {
    if (!fs.existsSync(this.filename)) return {};
    return JSON.parse(fs.readFileSync(this.filename, 'utf8')) || {};
  },

  load: function load(id) {
    return this.loadAllUsers()[id];
  },

  save: function save(id, user) {
    var users = this.loadAllUsers();
    users[id] = user;
    fs.writeFileSync(this.filename, JSON.stringify(users), 'utf8');
  }
}

passport.serializeUser = function serializeUser(user, res, done) {
  Users.save(user.id, user);
  done(null, user.id);
}

passport.deserializeUser = function deserializeUser(id, res, done) {
  var user = Users.load(id);
  if (!user) return done(new Error('No user available'));
  done(null, user);
}

passport.use(new DropboxStrategy({
  apiVersion: '2',
  clientID: secrets.dropbox.clientID,
  clientSecret: secrets.dropbox.clientSecret,
  callbackURL: 'http://localhost:3000/auth/dropbox/callback'
}, function(accessToken, refreshToken, profile, done) {
  profile.accessToken = accessToken;
  done(null, profile);
}));

module.exports = passport;
