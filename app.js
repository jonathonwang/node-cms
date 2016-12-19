const express = require('express');
const colors = require('colors');
const setupViewEngine = require('./config/view-engine');
const hbsHelpers = require('./config/hbs-helpers');
const routes = require('./routes/index');
const routesRegistrationHelper = require('./config/routes-helper');
const mongoDbConnection = require('./config/db');
const setupErrorHandling = require('./config/error-handling');

// Authentication Middleware
const isUserAuth = require('./middleware/index').isUserAuth;

// Express App
const app = express();

// =============================================================================
// Connect to MongoDb
mongoDbConnection(app);
// =============================================================================
// View engine setup
setupViewEngine(express, app);
// =============================================================================
// Register Handlebars Partials
const partialsDirectories = [
  __dirname + '/views/partials'
];
hbsHelpers.registerHandlebarsPartials(partialsDirectories);
// =============================================================================
// Register Handlebars Helpers
hbsHelpers.registerHandlebarsHelpers();
// =============================================================================
// User Auth Middleware
app.use((req, res, next) => isUserAuth(req, res, next));
// =============================================================================
// Setup App to Use Routes
routesRegistrationHelper(app, routes);
// =============================================================================
// Setup Error Handling
setupErrorHandling(app);

module.exports = app;
