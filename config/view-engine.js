const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nodeSassMiddleware = require('node-sass-middleware');
// =============================================================================
// View engine setup
const setupViewEngine = (app, express) => {
  app.set('views', path.join(__dirname, '../' ,'views'));
  app.set('view engine', 'hbs');
  app.use(favicon(path.join(__dirname, '../', 'public', 'images', 'node-favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(nodeSassMiddleware({
    src: path.join(__dirname, '../', 'public'),
    dest: path.join(__dirname, '../', 'public'),
    indentedSyntax: true,
    sourceMap: true
  }));
  app.use(express.static(path.join(__dirname, '../', 'public')));
}
// =============================================================================
module.exports = setupViewEngine;
