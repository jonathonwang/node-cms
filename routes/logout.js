const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// =============================================================================
// ROUTES
// GET home page
const baseUrl = '/';
router.get(baseUrl, (req, res, next) => {
  delete req.session.user_id;
  res.redirect('/login?logout=true');
});

// Must export array with '/route' and router
module.exports = { router };