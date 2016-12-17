const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const bodyParser = require('body-parser');
const colors = require('colors');
// Mongoose MongoDB Connection Helper
const mongooseConnection = require('./db');

// Helper to register Handlebars Partials
const registerHandlebarsPartials = require('./helpers');

// Routes
const routes = require('./routes/index');
// const users = require('./routes/users');

const app = express();
// Setup for Session Cookies
app.use(session({secret: 'YiYtX2DLjRJ.6vT6m7sf2+DqRbZB(+jHbbsG', cookie: {}}));

// =============================================================================
// Setup MongoDB Connection with Mongoose
mongooseConnection('mongodb://localhost:27017/node_cms');
// =============================================================================


// =============================================================================
// Register Handlebars Partials
const partialsDirectories = [
  __dirname + '/views/partials'
];

registerHandlebarsPartials(partialsDirectories);
// =============================================================================


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'node-favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// =============================================================================
// Setup App to Use Routes
const routesRegistrationHelper = (routes) => {
  for(let route in routes) {
    if(route === 'home'){
      app.use('/', routes[route].router);
    } else {
      app.use('/' + route, routes[route].router);
    }
  }
}
routesRegistrationHelper(routes);
// =============================================================================

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
