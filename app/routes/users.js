const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator');

const User = require('../models/index').User;

/* GET Users page. */
const baseUrl = '/';
router.get(baseUrl, (req, res, next) => res.render('register', { title: 'Register' }));


// Must export array with '/route' and router
module.exports = { router };
