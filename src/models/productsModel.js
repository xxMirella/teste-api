const Moongose = require('mongoose');
const CategorySchema = require('./categorySchema');


let ProductsModel = new Moongose.Schema({
  name:     { type: String, required: true },
  category: CategorySchema,
  price:    { type: String, required: true }
});

module.exports = Moongose.model('Product', ProductsModel, 'products');
