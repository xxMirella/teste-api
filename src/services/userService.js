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
    return { token };
  }

  static createHashPassword(password) {
    return bcrypt.hash(password, Config.bcryp_rounds);
  }

  static mongoObjectId() {
    let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  };

  static async createNewUserData(userData) {
    const { password } = userData;
    userData.id = await UserService.mongoObjectId();
    userData.address.id = await UserService.mongoObjectId();
    userData.password = await UserService.createHashPassword(password);
    return userData;
  }

  async register(data) {
    const exists = await this.user.get({ email: data.email });
    if (!exists.length) {
      return {
        response: this.user.post(UserService.createNewUserData(data))
          .then(value => {
            const response = JSON.parse(JSON.stringify(value));
            delete response.password;
            return response;
          })
          .catch(error => { Boom.internal(error) }),
        "TokenLogin": await UserService.createToken(data.email)
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
        .then(samePassword => {
          if (!samePassword) {
            return Boom.unauthorized('Senha incorreta');
          } else {
           return {
             user,
             "TokenLogin": UserService.createToken(user.email)
           }
          }
        });
    }
  };
}

module.exports = UserService;