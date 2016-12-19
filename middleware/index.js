const isUserAuth = require('./Auth');

const middlewares = [isUserAuth]

const setupMiddleware = (app) => {
  app.use((req, res, next) => {
    for(const middleware of middlewares) {
      middleware(req, res, next);
    }
  });
}

module.exports = setupMiddleware;
