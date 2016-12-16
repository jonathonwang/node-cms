const colors = require('colors');
const mongoose = require('mongoose');

// =============================================================================
// Setup MongoDB Connection with Mongoose
const mongooseConnection = (mongoDbUrl) => {
  mongoose.connect(mongoDbUrl);
  const db = mongoose.connection;
  // On Connection Error
  db.on('error', () => {
    console.log('MongoDB Connection Failed'.red.bold)
  });
  // On Connection Success
  db.once('open', () => {
    console.log('MongoDB Connection Successful'.green.bold)
  });
}
// =============================================================================

module.exports = mongooseConnection;
