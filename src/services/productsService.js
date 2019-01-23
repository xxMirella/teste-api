const Joi = require('joi');


class ProductsService {

  static validateProducts() {
    return Joi.object({
      name:     Joi.string().required(),
      category: Joi.string().required(),
      price:    Joi.string().required()
    });
  };
}