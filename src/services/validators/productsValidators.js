const Joi = require('joi');


class ProductsValidators {

  static validatePost() {
    return {
      body: {
        name:     Joi.string().required(),
        category: Joi.object({
          category: Joi.string().valid([
            'Beleza',
            'Limpeza doméstica',
            'Eletrônicos',
            'Comida',
            'Roupas',
            'Automobilísticos',
            'Brinquedos',
            'Jogos'
          ]).required()
        }),
        price:    Joi.number().required()
      }
    };
  };
}

module.exports = ProductsValidators;