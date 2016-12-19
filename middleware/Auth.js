const User = require('../app/index').User;

const isUserAuth = (req, res, next) => {
  if(req.session.user_id) {
    User.findOne({ _id: req.session.user_id }, (err, FoundUser) => {
      if(!err) {
        res.locals.user = {
          first_name: FoundUser.first_name,
          last_name: FoundUser.last_name,
          email: FoundUser.email
        };
        next();
      }
      else {
        next(err);
      }
    });
  }
  else {
    next();
  }
}

module.exports = isUserAuth;
