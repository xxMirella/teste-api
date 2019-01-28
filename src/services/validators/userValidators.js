const Joi = require('joi');


class UserValidators {

  static validateRegister() {
    return {
      body: {
        name: Joi.string().required(),
        birthday: Joi.number().required(),
        email: Joi.string().email().required(),
        address: Joi.object().keys({
          street: Joi.string().required(),
          number: Joi.number().required(),
          complement: Joi.string(),
          neighborhood: Joi.string().required(),
          city: Joi.string().required(),
          country: Joi.string().required()
        }),
        password: Joi.string().required()
      }
    };
  };

  static validateLogin() {
    return {
      body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    }
  }
}

module.exports = UserValidators;