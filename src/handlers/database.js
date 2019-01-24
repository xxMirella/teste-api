const Mongoose = require('mongoose');
const Boom = require('boom');

class Database {

  constructor(host) {
    this.host = host;
  }

  connect() {
    Mongoose.Promise = global.Promise;
    Mongoose.connect(this.host, {useMongoClient: true})
      .then(() => {
        console.log('Connected to MongoDB at ', this.host);
        return Mongoose.connection;
      })
      .catch(err => Boom.internal('Erro na conexão com banco ' + err));
  }
}

module.exports = Database;
