const express = require('express');
const router = express.Router();

/* GET home page. */
const url = '/';
router.get(url, (req, res, next) => {
  res.render('index', { home: false, title: 'Users' });
});

// Must export array with '/route' and router
module.exports = {
  url, router
};
