const Boom = require('boom');
const JWT = require('jsonwebtoken');
const Config = require('../config/config');


class MiddlewareService {

  static validateToken(req, res) {
    const token = req.headers['Authorization'];
    if (!token) {
      return Boom.unauthorized('Token inválido.')
    } else {
      return JWT.verify(token, Config.TokenKey)
        .then(decoded => {
          res.status(200).send(decoded)
        })
        .catch(error => {
          Boom.unauthorized('Não foi possível válidar token ' + error)
        })
    }
  }
}

module.exports = MiddlewareService;
