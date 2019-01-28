const JWT = require('jsonwebtoken');
const Boom = require('boom');
const Config = require('../config/config');
const bcrypt = require('bcrypt');

const UserDAO = require('../DAO/userDAO');


class UserService {

  constructor() {
    this.user = new UserDAO()
  }

  static createToken(userEmail) {
    return JWT.sign(
      userEmail,
      Config.TokenKey
    );
  }

  static createHashPassword(password) {
    return bcrypt.hash(password, Config.bcryp_rounds);
  }

  static async createNewUserData(userData) {
    const { password } = userData;
    userData.password = await UserService.createHashPassword(password);
    userData.token = await UserService.createToken(userData.email);
    userData.tokenIsActive = true;
    return userData;
  }

  async updateToken(user) {
    const token = await UserService.createToken(user.email);
    await this.user.pull(user._id, token);
    return await this.user.get({email: user.email});
  }

  static serializeResponse(value) {
    const response = JSON.parse(JSON.stringify(value));
    delete response.password;
    return response;
  }

  async register(data) {
    const exists = await this.user.get({email: data.email});
    if (!exists) {
      const user = await UserService.createNewUserData(data);
      return {
        response: await this.user.post(user)
          .then(value => {
            return UserService.serializeResponse(value);
          })
          .catch(error => {
            throw Boom.internal(error)
          })
      }
    } else {
      throw Boom.conflict('Email já cadastrado');
    }
  };

  async login(data) {
    const user = await this.user.get({email: data.email});
    if (!user) {
      throw Boom.unauthorized('Email não cadastrado');
    } else {
      return bcrypt.compare(data.password, user.password)
        .then(async samePassword => {
          if (!samePassword) {
            throw Boom.unauthorized('Senha incorreta');
          } else {
            const newUser = await this.updateToken(user);
            return {
              newUser
            }
          }
        });
    }
  };
}

module.exports = UserService;
