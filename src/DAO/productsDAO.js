const CrudDAO = require('./crudDAO');
const ProductsModel = require('../models/products');


class ProductsDAO extends CrudDAO {
  constructor() {
    super(ProductsModel, '_id');
  }
}

module.exports = ProductsDAO;
