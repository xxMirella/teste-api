const Boom = require('boom');
const JWT = require('jsonwebtoken');
const Config = require('../config/config');
const UserDAO = require('../DAO/userDAO');


class MiddlewareService {

  static validateToken(req, res) {
    const token = req.headers['Authorization'];
    if (!token) {
      return Boom.unauthorized('Token inválido.')
    } else {
      return JWT.verify(token, Config.TokenKey)
        .then(decoded => {
          const user = new UserDAO();
          const tokenActive = user.get({ token: req.headers.authorization });
          if (tokenActive.tokenIsActive) {
            res.status(200).send(decoded)
          } else {
            Boom.unauthorized('Token inativo!')
          }
        })
        .catch(error => {
          Boom.unauthorized('Não foi possível válidar token ' + error)
        })
    }
  }
}

module.exports = MiddlewareService;
