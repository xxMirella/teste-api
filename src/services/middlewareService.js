const Boom = require('boom');
const JWT = require('jsonwebtoken');
const Config = require('../config/config');
const UserDAO = require('../DAO/userDAO');


class MiddlewareService {

  static validateToken(req) {
    const token = req.headers.authorization;
    if (!token) {
      throw Boom.unauthorized('Token inválido.')
    } else {
      return JWT.verify(token, Config.TokenKey, (error, token) => {
        if (error) {
          throw Boom.unauthorized('Não foi possível válidar token ' + error)
        } else {
          const user = new UserDAO();
          const tokenActive = user.get({ token: req.headers.authorization });
          if (tokenActive.tokenIsActive) {
            return token
          } else {
            throw Boom.unauthorized('Token inativo!')
          }
        }
      });
    }
  };
}

module.exports = MiddlewareService;
