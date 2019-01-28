const Express = require('express');
const ExpressJoiValidator = require('express-joi-validator');

const UserService = require('../services/userService');
const UserValidators = require('../services/validators/userValidators');


class UserController {

  constructor() {
    this.service = new UserService();
    this.router = new Express();
  }

  register() {
    return this.router.post('/user/register', ExpressJoiValidator(UserValidators.validateRegister()), async (req, res) => {
      await this.service.register(req.body)
        .then(result => {
          res.status(200).send(result)
        })
        .catch(error => {
          res.status(error.output.statusCode).send(error.message);
        });
    });
  };

  login() {
    return this.router.post('/user/login', ExpressJoiValidator(UserValidators.validateLogin()), async (req, res) => {
      await this.service.login(req.body)
        .then(result => {
          res.status(200).send(result)
        })
        .catch(error => {
          res.status(error.output.statusCode).send(error.message);
        });
    });
  };
}

module.exports = UserController;
