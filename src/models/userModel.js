const Mongoose = require('mongoose');
const AddressSchema = require('./addressSchema');


let UserModel = new Mongoose.Schema({
  name:          { type: String, required: true },
  birthday:      { type: Date, required: true },
  email:         { type: String, required: true },
  address:       AddressSchema,
  password:      { type: String, required: true },
  token:         { type: String, required: false },
  tokenIsActive: { type: Boolean, required: false }
});

module.exports = Mongoose.model('User', UserModel, 'users');
