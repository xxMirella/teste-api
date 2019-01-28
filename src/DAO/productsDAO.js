const CrudDAO = require('./crudDAO');
const ProductsModel = require('../models/productsModel');


class ProductsDAO extends CrudDAO {
  constructor() {
    super(ProductsModel, '_id');
  }
}

module.exports = ProductsDAO;
