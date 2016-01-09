'use strict';

var env = process.env.NODE_ENV || 'development';
var express = require('express');
var http = require('http');
var getPosts = require('../../lib/getPosts');
var app = express();

app.set('state', {});


getPosts().then(function(posts) {
  app.get('state').posts = posts;
});

// Inject Routes
require('../config/routes')(app);

// Inject Config
require('../config/server')[env](app, express);

// Inject component rendering
require('node-jsx').install({extension: '.jsx'});
app.use(require('../../lib/renderReactComponent')(app));

// Start server
var server = http.createServer(app);
var port = process.env.PORT || 3000;
return server.listen(port, function() {
  return console.log('Listening on port ' + port + ', Env: ' + app.settings.env);
});

module.exports = app;


