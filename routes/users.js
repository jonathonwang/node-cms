const express = require('express');
const router = express.Router();

/* GET home page. */
const url = '/users';
router.get(url, (req, res, next) => {
  res.render('index', { home: false, title: 'Test' });
});

// Must export array with '/route' and router
module.exports = {
  url,
  router
};
