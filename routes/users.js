const express = require('express');
const router = express.Router();

/* GET home page. */
const baseUrl = '/';
router.get(baseUrl, (req, res, next) => {
  res.render('index', { home: false, title: 'Users' });
});

// Must export array with '/route' and router
module.exports = { router };
