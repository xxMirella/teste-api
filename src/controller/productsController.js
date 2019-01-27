const Express = require('express');

const ProductService = require('../services/productsService');


class ProductsController {

  constructor() {
    this.router = new Express();
    this.service = new ProductService();
  }

  get() {
    return this.router.get('/products', async (req, res) => {
      res.send(
        await this.service.getAll(req)
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
      await this.service.getProducts(req)
        .then(result => {
          res.status(200).send(result)
        })
        .catch(error => {
          res.status(400).send(error)
        })
    });
  };

  post() {
    return this.router.post('/products', async (req, res) => {
      await this.service.postProducts(req)
        .then(result => {
          res.status(200).send(result)
        })
        .catch(error => {
          res.status(400).send(error)
        })
    });
  };

  put() {
    return this.router.put('/products/:id', async (req, res) => {
      await this.service.putProducts(req)
        .then(result => {
          res.status(200).send(result)
        })
        .catch(error => {
          res.status(400).send(error)
        })
    });
  }

  delete() {
    return this.router.post('/products/:id', async (req, res) => {
      await this.service.deleteProducts(req)
        .then(result => {
          res.status(200).send(result)
        })
        .catch(error => {
          res.status(400).send(error)
        })
    });
  }
}

module.exports = ProductsController;
