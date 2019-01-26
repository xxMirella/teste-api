const Mongoose = require('mongoose');
const Boom = require('boom');

class Database {

  constructor(host) {
    this.host = host;
  }

  connect() {
    Mongoose.Promise = global.Promise;
    Mongoose.connect(this.host, {useMongoClient: true}, (error) => {
      if (error) {
        throw Boom.internal('Erro na conexão com banco ' + error)
      } else {
        console.log('Connected to MongoDB at ', this.host);
        return Mongoose.connection;
      }
    });
  };
}

module.exports = Database;
