const JWT = require('jsonwebtoken');
const Boom = require('boom');
const Crypto = require("crypto");
const Config = require('../config/config');
const cipher = Crypto.createCipheriv('aes-256-cbc');

const UserDAO = require('../DAO/userDAO');


class UserService {

  constructor() {
    this.user = new UserDAO()
  }

  static createToken(userEmail) {
    const token = JWT.sign(
      userEmail,
      config.TokenKey.key
    );
    return { token };
  }

  static encrypt(password) {
    cipher.update(password);
    return cipher.final(Config.encrypt_config.type_encrypt)
  }

  async register(res, data) {
    const exists = this.user.get({ email: data.email });
    if (!exists.length) {
      return {
        response: await this.user.post(data)
          .then(value => {
            const response = JSON.parse(JSON.stringify(value));
            delete response.password;
            return response;
          })
          .catch(error => { Boom.internal(error) }),
        "TokenLogin": utils.createToken(data.email)
      }
    } else {
      return Boom.conflict('Email já cadastrado');
    }
  };

  login(data) {
    const exists = this.user.get({email: data.email});
    if (!exists) {
      return Boom.unauthorized('Email não cadastrado')
    }
  }
}
