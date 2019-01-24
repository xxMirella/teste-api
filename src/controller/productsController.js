const Express = require('express');

const ProductsDAO = require('../DAO/productsDAO');
const Middleware = require('../services/middlewareService');


class ProductsController {

  constructor() {
    this.router = new Express();
    this.product = new ProductsDAO();
  }

  get() {
    return this.router.get('/products', async (req, res) => {
      res.send(
        await this.product.all()
          .then(result => {
            res.status(200).send(result)
          })
          .catch(error => {
            res.status(400).send(error.message)
          })
      );
    });
  };


  getOne() {
    return this.router.get('/products/:id', async (req, res) => {
      await Middleware.validateToken(req, res)
        .then(res.send(await this.product.get({_id: req.params.id})))
        .catch(error => {
          res.status(400).send(error.message)
        })
    });
  };

  post() {
    return this.router.post('/products', async (req, res) => {
      await Middleware.validateToken(req, res)
        .then(res.send(await this.product.post(req.body)))
        .catch(error => {
          res.status(400).send(error.message)
        })
    });
  };

  put() {
    return this.router.put('/products/:id', async (req, res) => {
      await Middleware.validateToken(req, res)
        .then(res.send(await this.product.pull(req.params.id, req.body)))
        .catch(error => {
          res.status(400).send(error.message)
        })
    });
  }

  delete() {
    return this.router.post('/products/:id', async (req, res) => {
      res.send(
        await this.product.post(req.params.id)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(error => {
            res.status(400).send(error.message)
          })
      );
    });
  }
}

module.exports = ProductsController;
