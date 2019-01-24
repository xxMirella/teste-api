const Moongose = require('mongoose');
const ObjectId = Moongose.Schema.ObjectId;
const CategorySchema = require('./categorySchema');


let ProductsModel = new Moongose.Schema({
  id:       { type: ObjectId, required: true },
  name:     { type: String, required: true },
  category: CategorySchema,
  price:    { type: String, required: true }
});

module.exports = Moongose.model('Product', ProductsModel, 'products');
