const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const env = require('dotenv').config();
// =============================================================================
// Setup MongoDB Connection with Mongoose
// mongooseConnection('mongodb://localhost:27017/node_cms');
const mongoDbConnection = (app) => {
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
}

module.exports = mongoDbConnection;
