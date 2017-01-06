const express = require('express');
const router = express.Router();

/* GET Register page. */
const baseUrl = '/';
router.get(baseUrl, (req, res, next) => {
  res.render('register', { title: 'Register' })
});

// POST Register Page
router.post(baseUrl, (req, res, next) => {
  authController.attemptUserCreation(req, res);
});

// Must export array with '/route' and router
module.exports = { router };
