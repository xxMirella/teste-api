/*jslint node: true */
"use strict";

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
    const token = JWT.sign(
      userEmail,
      Config.TokenKey
    );
    return {token};
  }

  static createHashPassword(password) {
    return bcrypt.hash(password, Config.bcryp_rounds);
  }

  static async createNewUserData(userData) {
    const { password } = userData;
    userData.password = await UserService.createHashPassword(password);
    userData.token = await UserService.createToken(userData.email);
    return userData;
  }

  async register(data) {
    const exists = await this.user.get({email: data.email});
    console.log("EXISTE", !exists, exists);
    if (!exists) {
      const user = await UserService.createNewUserData(data);
      return {
        response: await this.user.post(user)
          .then(value => {
            console.log("DENTO DO THEN", value);
            const response = JSON.parse(JSON.stringify(value));
            delete response.password;
            console.log("RESPOSTA", response);
            return response;
          })
          .catch(error => {
            Boom.internal(error)
          })
      }
    } else {
      return Boom.conflict('Email já cadastrado');
    }
  };

  async login(data) {
    const user = await this.user.get({email: data.email});
    if (!user) {
      return Boom.unauthorized('Email não cadastrado');
    } else {
      return bcrypt.compare(data.password, user.password)
        .then(async samePassword => {
          if (!samePassword) {
            return Boom.unauthorized('Senha incorreta');
          } else {
            const token = await UserService.createToken(user.email);
            const newUser = await this.user.pull(user._id, { token: token});
            return {
              newUser
            }
          }
        });
    }
  };
}

module.exports = UserService;
