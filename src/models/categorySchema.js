const Mongoose = require('mongoose');


let CategorySchema = new Mongoose.Schema({
  category: {
    type: String,
    enum: [
      'Beleza',
      'Limpeza doméstica',
      'Eletrônicos',
      'Comida',
      'Roupas',
      'Automobilísticos',
      'Brinquedos',
      'Jogos'
    ]
  }
});

module.exports = CategorySchema;
