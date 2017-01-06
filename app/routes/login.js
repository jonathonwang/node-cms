const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');
// =============================================================================
// ROUTES
// GET home page
const baseUrl = '/';
router.get(baseUrl, (req, res, next) => {
  authController.getLogin(req, res, next);
});
// POST Login User at route '/login'
router.post(baseUrl, (req, res, next) => {
  authController.attemptUserLogin(req, res);
});

module.exports = { router };
