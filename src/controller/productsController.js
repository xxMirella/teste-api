const Express = require('express');
const ExpressJoiValidator = require('express-joi-validator');

const ProductService = require('../services/productsService');
const ProductsValidator = require('../services/validators/productsValidators');


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
            res.status(200).send(result);
          })
          .catch(error => {
            res.status(error.output.statusCode).send(error.message);
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
          res.status(error.output.statusCode).send(error.message);
        })
    });
  };

  post() {
    return this.router.post('/products',
      ExpressJoiValidator(ProductsValidator.validatePost()), async (req, res) => {
        await this.service.postProducts(req)
          .then(result => {
            res.status(200).send(result)
          })
          .catch(error => {
            res.status(error.output.statusCode).send(error.message);
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
          res.status(error.output.statusCode).send(error.message);
        })
    });
  }

  delete() {
    return this.router.delete('/products/:id', async (req, res) => {
      await this.service.deleteProducts(req)
        .then(result => {
          res.status(200).send(result)
        })
        .catch(error => {
          res.status(error.output.statusCode).send(error.message);
        })
    });
  }
}

module.exports = ProductsController;
