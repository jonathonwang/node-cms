const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
// =============================================================================
// ROUTES
// GET Logout page '/logout'
const baseUrl = '/';
router.get(baseUrl, (req, res, next) => {
  authController.logout(req, res);
});

// Must export array with '/route' and router
module.exports = { router };
