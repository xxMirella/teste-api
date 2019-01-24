const UserService = require('../services/userService');

const Express = require('express');


class UserController {

  constructor() {
    this.user = new UserService();
    this.router = new Express();
  }

  register() {
    return this.router.post('/user', async (req, res) => {
      await this.user.register(req.body)
        .then(result => {
          res.status(200).send(result)
        })
        .catch(error => {
          res.status(400).send(error.message)
        });
    });
  };

  login() {
    return this.router.post('/user/login', async (req, res) => {
      await this.user.login(req.body)
        .then(result => {
          res.status(200).send(result)
        })
        .catch(error => {
          res.status(400).send(error.message)
        });
    });
  };
}

module.exports = UserController;
