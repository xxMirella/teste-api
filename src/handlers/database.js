const Mongoose = require('mongoose');
const Boom = require('boom');

class Database {

  constructor(host) {
    this.host = host;
  }

  connect() {
    try {
      Mongoose.connect(this.host, { useNewUrlParser: true });
      return Mongoose.connection;
    } catch (error) {
      return Boom.internal('Erro na conexão com banco')
    }
  }
}

module.exports = Database;
