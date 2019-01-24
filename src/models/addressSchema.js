const Mongoose = require('mongoose');


let AddressSchema = new Mongoose.Schema({
  street:       { type: String, required: true },
  number:       { type: String, required: true },
  complement:   { type: String, required: false },
  neighborhood: { type: String, required: true },
  city:         { type: String, required: true },
  country:      { type: String, required: true }
});

module.exports = AddressSchema;
