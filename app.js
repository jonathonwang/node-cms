const env = require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const colors = require('colors');
const mongoose = require('mongoose');

// Helper to register Handlebars Partials
const registerHandlebarsPartials = require('./helpers');

// Routes
const routes = require('./routes/index');

// Authentication Middleware
const isUserAuth = require('./middleware/index').isUserAuth;

const app = express();

// =============================================================================
// Setup MongoDB Connection with Mongoose
// mongooseConnection('mongodb://localhost:27017/node_cms');
mongoose.connect(env.DB_HOST);
const db = mongoose.connection;
// On Connection Error
db.on('error', () => {
  console.log('MongoDB Connection Failed'.red.bold)
});
// On Connection Success
db.once('open', () => {
  console.log('MongoDB Connection Successful'.green.bold)
});
// =============================================================================

// Setup for Session Cookies
app.use(session({
  secret: env.SESSION_SECRET,
  name: env.SESSION_NAME,
  cookie: {},
  store: new MongoStore({ mongooseConnection: db }),
  resave: true,
  saveUninitialized: true
}));



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

// User Auth Middleware
app.use((req, res, next) => isUserAuth(req, res, next));

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


// =============================================================================
// Register Handlebars Partials
const partialsDirectories = [
  __dirname + '/views/partials'
];

registerHandlebarsPartials(partialsDirectories);
// =============================================================================
// Should be imported later -- used for debugging
const hbs = require('hbs');
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});
// =============================================================================


module.exports = app;
