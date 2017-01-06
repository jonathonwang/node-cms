const express = require('express');
const path = require('path');
const colors = require('colors');

// Configuration Imports
const setupViewEngine = require('./config/view-engine');
const hbsHelpers = require('./config/hbs-helpers');
const routes = require('./routes/index');
const routesRegistrationHelper = require('./config/routes-helper');
const mongoDbConnection = require('./config/db');
const setupMiddleware = require('./middleware/index');
const setupErrorHandling = require('./config/error-handling');

// Express App
const app = express();

// =============================================================================
// Connect to MongoDb + Setup Session
mongoDbConnection(app);
// =============================================================================
// View engine setup
setupViewEngine(app, express);
// =============================================================================
// Register Handlebars Partials
const partialsDirectories = [ path.join(__dirname + '/views/partials') ];
hbsHelpers.registerHandlebarsPartials(partialsDirectories);
// =============================================================================
// Register Handlebars Helpers
hbsHelpers.registerHandlebarsHelpers();
// =============================================================================
// Setup Middleware -- (must go before routes are registered)
setupMiddleware(app);
// =============================================================================
// Setup App to Use Routes
routesRegistrationHelper(app, routes);
// =============================================================================
// Setup Error Handling
setupErrorHandling(app);

module.exports = app;
