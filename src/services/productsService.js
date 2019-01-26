const Joi = require('joi');
const Boom = require('boom');

const ProductsDAO = require('../DAO/productsDAO');
const Middleware = require('./middlewareService');


class ProductsService {

  constructor() {
    this.products = new ProductsDAO();
  }

  static validateProducts() {
    return Joi.object({
      name:     Joi.string().required(),
      category: Joi.string().required(),
      price:    Joi.string().required()
    });
  };

  async getProducts(req) {
    await Middleware.validateToken(req);
    const products = this.products.get({_id: req.params.id});
    if (!products) {
      throw Boom.notFound('Produto não encontrado!');
    } else {
      return products;
    }
  }
}

module.exports = ProductsService;