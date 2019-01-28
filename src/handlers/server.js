const Express = require('express');
const BodyParser = require('body-parser');
const Session = require('express-session');
const Cors = require('cors');


class ServerExpress {

  constructor() {
    this.server = new Express();
  }

  connect(port, routes) {
    this.server.use(Cors());
    this.server.use(BodyParser.json());
    this.server.use(BodyParser.urlencoded({ extended: true }));
    this.server.use('/api', routes);
    this.server.use(Session({ secret: 'krunal', resave: false, saveUninitialized: true, }));
    this.server.use((err, req, res, next)  => {
      if (err && err.output) {
        return res.status(err.output.statusCode).json(err.output.payload);
      } else if (err && err.statusCode) {
        return res.status(err.statusCode).json(err.type);
      } else {
        return res.status(500).json(err);
      }
    });

    return this.server.listen(port, () => {
      console.log(`server running at ${port}`)
    });
  }
}

module.exports = ServerExpress;
