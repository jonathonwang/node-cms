const bcrypt = require('bcrypt');
const User = require('../models/index.js').User;
const validator = require('validator');

const authController = {
  // Get Login Page
  getLogin(req,res,next) {
    if(req.query.logout) {
      res.render('login', {
        title: 'Login',
        success: { message: 'Successfully Logged Out' }
      });
    } else {
      res.render('login', { title: 'Login' });
    }
  },
  // Logout
  logout(req, res) {
    delete req.session.user_id;
    res.redirect('/login?logout=true');
  },
  // Attempt Login
  attemptUserLogin(req, res) {
    const email = req.body.email;
    const suppliedPassword = req.body.password;
    if(email && suppliedPassword){
      this.attemptUserAuth(req, res, email, suppliedPassword, User);
    } else if (!email || !suppliedPassword){
      this.loginFailed(res, 'Username Or Password Empty');
    } else {
      this.loginFailed(res, 'Something Went Wrong');
    }
  },

  // Attempt Auth Function =====
  attemptUserAuth(req, res, email, suppliedPassword, User) {
    // Find the User by Email
    User.findOne({ email }, (err, FoundUser) => {
      if(!err && FoundUser) {
        // User Found User Password Hash to compare to Supplied Password
        bcrypt.compare(suppliedPassword, FoundUser.password, (err, isMatch) => {
          if (isMatch){
            this.loginSuccess(req, res, 'User Logged In', FoundUser);
          } else {
            this.loginFailed(res, 'Username And Password Doesnt Match');
          }
        });
      } else {
        this.loginFailed(res, 'Could Not Find User');
      }
    });
  },
  // Login Fail Function =====
  loginFailed(res, errorMessage) {
    res.render('login', {
      title: 'Login',
      error: { message: errorMessage }
    });
  },
  // Login Success Function =====
  loginSuccess(req, res, successMessage, FoundUser) {
    req.session.user_id = FoundUser._id;
    res.redirect('/admin');
  },
  // Registration Method
  attemptUserCreation(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if(email && password && validator.isEmail(email)) {
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if(!err) {
          const newUser = new User({
            email,
            first_name,
            last_name,
            password: hash,
            created_at: new Date(),
            updated_at: new Date()
          });
          newUser.save((err, newUser)=> {
            if(!err) {
              res.render('register', {
                title: 'Register',
                success: { message: 'Please check your email for a verification code' }
              });
            } else {
              res.render('register', {
                title: 'Register',
                error: { message: 'It Appears You Might Already Have an Account, Did you forget your password?' }
              });
            }
          });
        } else {
          res.send(err);
        };
      });
    } else {
      res.render('register', {
        title: 'Register',
        error: { message: 'Email and Password are Required' }
      });
    }
  }
};

module.exports = authController;
