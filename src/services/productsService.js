const Boom = require('boom');

const ProductsDAO = require('../DAO/productsDAO');


class ProductsService {

  constructor() {
    this.product = new ProductsDAO()
  }


}
