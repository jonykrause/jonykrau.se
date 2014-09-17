var fs = require('fs');
var staticDir = './public';
var logFilePath = './log.log';
var morgan = require('morgan');
var serveStatic = require('serve-static');


exports.development = function(app, express) {
  var errorHandler = require('errorhandler');
  app.set('port', process.env.PORT || 8888);
  app.locals.pretty = true;
  app.use(morgan('dev'));
  app.use(errorHandler());
  app.use(serveStatic(staticDir));
}

exports.production = function(app, express) {
  var compression = require('compression');
  var oneYear = 31557600000;
  var logFile = fs.createWriteStream(logFilePath, { flags: 'w' });
  app.set('port', process.env.PORT || 8888);
  app.use(compression());
  app.use(morgan('combined', { stream: logFile }));
  app.use(serveStatic(staticDir, { maxAge: oneYear}));
}

