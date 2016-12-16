const express = require('express');
const router = express.Router();

/* GET home page. */
const baseUrl = '/';
router.get(baseUrl, (req, res, next) => {
  res.render('index', { home: true, title: 'Test' });
});

module.exports = { router };
