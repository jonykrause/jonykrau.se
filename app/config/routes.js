
module.exports = function(app) {

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
