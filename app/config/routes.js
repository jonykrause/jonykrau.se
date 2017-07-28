var path = require('path');


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
