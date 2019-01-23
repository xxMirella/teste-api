const Boom = require('boom');


class MiddlewareService {

  static requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
      return next(Boom.unauthorized('Login requerido!'));
    }
  }
}

module.exports = MiddlewareService;