## Teste API

Api REST feita utilizando Node.js, para cadastrar productos.

### Iniciando a aplicação

> `npm install`

> npm run start


## Rotas de usuário

Parametro para registro de usuário `/api/user/register`:
```
{
    "name": Joi.string().required(),
    "birthday": Joi.number().required(),
    "email": Joi.string().email().required(),
    "address": Joi.object().keys({
      "street": Joi.string().required(),
      "number": Joi.number().required(),
      "complement": Joi.string(),
      "neighborhood": Joi.string().required(),
      "city": Joi.string().required(),
      "country": Joi.string().required()
    }),
    "password": Joi.string().required()
}
```
A resposta do endpoint, é o usuário cadastrado e um token válido.

Parametro para login de usuário `/api/user/login`:
```
{
    "email": Joi.string().email().required(),
    "password": Joi.string().required()
}
```
A resposta do endpoint, é o usuário cadastrado e um token válido.


## Rotas para producto


Parametro para cadastro de produto `/api/products`:
```
{
    "name": Joi.string().required(),
    "category:" Joi.object({
      "category": Joi.string().valid([
          'Beleza',
          'Limpeza doméstica',
          'Eletrônicos',
          'Comida',
          'Roupas',
          'Automobilísticos',
          'Brinquedos',
          'Jogos'
        ].required()
    }),
    "price": Joi.number().required()
}
```

A resposta da api é o produto cadastrado.