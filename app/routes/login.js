const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/index.js').User;

// =============================================================================
// ROUTES
// GET home page
const baseUrl = '/';
router.get(baseUrl, (req, res, next) => {
  // check to see if they were redirected from '/logout'
  if(req.query.logout) {
    res.render('login', {
      title: 'Login',
      success: { message: 'Successfully Logged Out' }
    });
  } else {
    res.render('login', { title: 'Login' });
  }
});
// POST Login User at route '/login'
router.post(baseUrl, (req, res, next) => {
  attemptUserLogin(req, res);
});

// =============================================================================

// =============================================================================
// Login Post Route Functions

// Attempt User Login =====
// Check to make sure that the email and password form fields are not empty
const attemptUserLogin = (req, res) => {
  const email = req.body.email;
  const suppliedPassword = req.body.password;
  if(email && suppliedPassword){
    attemptUserAuth(req, res, email, suppliedPassword, User);
  } else if (!email || !suppliedPassword){
    loginFailed(res, 'Username Or Password Empty');
  } else {
    loginFailed(res, 'Something Went Wrong');
  }
}

// Attempt Auth Function =====
const attemptUserAuth = (req, res, email, suppliedPassword, User) => {
  // Find the User by Email
  User.findOne({ email }, (err, FoundUser) => {
    if(!err && FoundUser) {
      // User Found User Password Hash to compare to Supplied Password
      bcrypt.compare(suppliedPassword, FoundUser.password, (err, isMatch) => {
        if (isMatch){
          loginSuccess(req, res, 'User Logged In', FoundUser);
        } else {
          loginFailed(res, 'Username And Password Doesnt Match');
        }
      });
    } else {
      loginFailed(res, 'Could Not Find User');
    }
  });
}
// Login Fail Function =====
const loginFailed = (res, errorMessage) => {
  res.render('login', {
    title: 'Login',
    error: { message: errorMessage }
  });
}
// Login Success Function =====
const loginSuccess = (req, res, successMessage, FoundUser) => {
  req.session.user_id = FoundUser._id;
  res.redirect('/admin');
}
// End Login Post Route Functions
// =============================================================================

// Must export array with '/route' and router
module.exports = { router };
