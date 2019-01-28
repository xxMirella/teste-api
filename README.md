## Teste API

Api REST feita utilizando Node.js, para cadastrar productos.

### Iniciando a aplicação

> `npm install`

A biblioteca do `bcrypt` pode apresentar alguns erros ao ser instalada no Windows, para ajuda em como proceder quanto a instalação dessa biblioteca, utilize a [Documentação Bcrypt](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#microsoft-windows).

### Execução da aplicação

> `npm run start`

#Endpoints

### Cadastro de usuário `/api/user/register`:
POST /api/user/register HTTP/1.1

Host: localhost:3000

Content-Type: application/json
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

### Login de usuário `/api/user/login`:
POST /api/user/login HTTP/1.1

Host: localhost:3000

Content-Type: application/json
```
{
    "email": Joi.string().email().required(),
    "password": Joi.string().required()
}
```
A resposta do endpoint, é o usuário cadastrado e um token válido.


### Cadastro de produtos `/api/products`:
POST /api/products HTTP/1.1

Host: localhost:3000

Content-Type: application/json

Authorization: `TOKEN-AQUI`
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