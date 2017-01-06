const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/index').User;

/* GET Register page. */
const baseUrl = '/';
router.get(baseUrl, (req, res, next) => {
  res.render('admin', { title: 'Admin' })
});

// Must export array with '/route' and router
module.exports = { router };
