var path = require('path');
var bodyParser = require('body-parser');
const cache = require('../server/cache');


module.exports = function(app) {
  if (process.env.NODE_ENV === "production") {
    var httpAuth = require('http-auth');
    var basicAuth = httpAuth.basic({
      realm: 'CV',
      file: __dirname + '/.htpasswd'
    });

    app.get('/cv', httpAuth.connect(basicAuth), function(req, res, next) {
      return next();
    });
  }

  app.post('/rides', bodyParser.json(), function(req, res) {
    cache.set("tracking", req.body, function(err) {
      if (err) {
        console.err(err);
      }
      res.end();
    });
  });

  // Handle legacy urls
  app.get('/rainforest', function(req, res) {
    return res.send(require('../components/pages/legacy-rainforest')());
  });

  app.get('/artikel/mootools', function(req, res) {
    return res.redirect('/posts/mootools-im-uberblick');
  });

  app.get('/artikel/parallax', function(req, res) {
    return res.redirect('/posts/parallax-mit-mootools');
  });

  app.get('/artikel/rainforest-deforestation', function(req, res) {
    return res.redirect('/posts/rainforest-infographic');
  });

  return app.get('/artikel/:id', function(req, res) {
    return res.redirect('/posts/' + req.params.id);
  });

}
