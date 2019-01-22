const Mongoose = require('mongoose');
const ObjectId = Mongoose.Schema.ObjectId;
const AddressSchema = require('./addressModel');


let UserModel = new Mongoose.Schema({
  id:       { type: ObjectId, required: true },
  name:     { type: String, required: true },
  birthday: { type: Date, required: true },
  email:    { type: String, required: true },
  address:  AddressSchema,
  password: { type: String, required: true }
});

module.exports = UserModel;
