const Boom = require('boom');

const ProductsDAO = require('../DAO/productsDAO');
const Middleware = require('./middlewareService');


class ProductsService {

  constructor() {
    this.products = new ProductsDAO();
  }

  async getProducts(req) {
    await Middleware.validateToken(req);
    const products = await this.products.get({_id: req.params.id});
    if (!products) {
      throw Boom.notFound('Produto não encontrado!');
    } else {
      return products;
    }
  };

  async getAll(req) {
    const products = await this.products.list({}, req.query.limit, req.query.ignore);
    if (products.length === 0) {
      throw Boom.notFound('Nenhum produto cadastrado')
    } else {
      return products;
    }
  };

  async postProducts(req) {
    await Middleware.validateToken(req);
    return await this.products.post(req.body);
  }

  async putProducts(req) {
    await Middleware.validateToken(req);
    return await this.products.update(req.params.id, req.body);
  }

  async deleteProducts(req) {
    await Middleware.validateToken(req);
    return await this.products.delete({_id: req.params.id});
  }
}

module.exports = ProductsService;