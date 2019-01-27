const Boom = require('boom');
const JWT = require('jsonwebtoken');
const Config = require('../config/config');
const UserDAO = require('../DAO/userDAO');


class MiddlewareService {

  static validateToken(req) {
    const token = req.headers.authorization;
    if (!token) {
      throw Boom.notFound('Token não encontrado.')
    } else {
      return JWT.verify(token, Config.TokenKey, async (error, email) => {
        if (error) {
          throw Boom.internal('Não foi possível válidar token ' + error)
        } else {
          const userDAO = new UserDAO();
          const tokenActive = await userDAO.get({ email: email });
          if (tokenActive.tokenIsActive) {
            return tokenActive
          } else {
            throw Boom.unauthorized('Token inativo!')
          }
        }
      });
    }
  };
}

module.exports = MiddlewareService;
