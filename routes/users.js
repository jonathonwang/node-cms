const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../app/index').User;

/* GET Register page. */
const baseUrl = '/';
router.get(baseUrl + 'register', (req, res, next) => {
  res.render('register', { title: 'Register' })
});

// POST Register Page
router.post(baseUrl + 'register', (req, res, next) => {
  attemptUserCreation(req, res);
});

const attemptUserCreation = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if(email && password) {
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
            res.send(newUser.email + ' Saved');
          } else {
            res.send(err);
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

// Must export array with '/route' and router
module.exports = { router };
