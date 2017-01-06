const isUserAuth = require('./Auth');

const middlewares = [isUserAuth]

const setupMiddleware = (app) => {
  for(const middleware of middlewares) {
    app.use((req, res, next) => {
        middleware(req, res, next);
    });
  }
}

module.exports = setupMiddleware;
