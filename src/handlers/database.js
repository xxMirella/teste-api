const Express = require('express');
const BodyParser = require('body-parser');


class ServerExpress {

  constructor() {
    this.server = new Express();
  }

  connect(port, routes) {
    this.server.use(BodyParser.json());
    this.server.use(BodyParser.urlencoded({ extended: true }));
    this.server.use('/api', routes);

    return this.server.listen(port, () => {
      console.log(`server running at ${port}`)
    });
  }
}

module.exports = ServerExpress;
