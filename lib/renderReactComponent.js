var ReactApp = require('../app');
var React = require('react');
var path = require('path');
var url = require('url');
const cache = require('../app/server/cache');


module.exports = function(app) {
  return function(req, res, next) {
    try {
      var path = url.parse(req.url).pathname;
      let state = app.get('state');
      cache.get('tracking', function(err, value){
        if (err) {
          throw err;
        }
        state.tracking = value;
        res.send(React.renderComponentToStaticMarkup(ReactApp({ path: path, state: state })));
      });
    } catch(err) {
      return next(err)
    }
  }
}
