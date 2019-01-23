const Server = require('./handlers/server');
const Database = require('./handlers/database');
const ProductsController = require('./controller/productsController');
const UserController = require('./controller/userController');
const config = require('./config/config');


async function main() {
  const server = new Server();
  const database = new Database(config.database.host);
  await database.connect();

  const user = new UserController();
  const products = new ProductsController();

  const Routes = [
    user.login(),
    user.register(),
    products.get(),
    products.getOne(),
    products.post(),
    products.put(),
    products.delete(),
  ];

  await server.connect(3000, Routes);
}

main();