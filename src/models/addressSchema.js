const Mongoose = require('mongoose');
const ObjectId = Mongoose.Schema.ObjectId;


let AddressSchema = new Mongoose.Schema({
  id:           { type: ObjectId, required: true },
  street:       { type: String, required: true },
  number:       { type: String, required: true },
  complement:   { type: String, required: false },
  neighborhood: { type: String, required: true },
  city:         { type: String, required: true },
  country:      { type: String, required: true }
});

module.exports = AddressSchema;
