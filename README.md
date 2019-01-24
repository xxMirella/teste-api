## Teste API

Parametro para registro de usuário `/api/user`:
```
 {
      "name": "String",
      "birthday": "String(Formato Date)",
      "email":    "String",
      "address":  {
      	  "street": "String",
    	  "number": "Integer",
    	  "complement": "String",
    	  "neighborhood": "String",
    	  "city": "String",
    	  "country": "String"
      },
      "password": "String"
 }
```

response:
```
{
    "response": {
        "__v": 0,
        "name": "Aline",
        "birthday": "1996-09-05T00:00:00.000Z",
        "email": "aline123456@aline.com",
        "address": {
            "street": "rua dos doido",
            "number": "0",
            "complement": "apt 1",
            "neighborhood": "vale das sombras",
            "city": "Townsville",
            "country": "Fogo",
            "_id": "5c4a056b95d73a27987ed276"
        },
        "_id": "5c4a056b95d73a27987ed275"
    },
    "TokenLogin": {
        "token": "String"
    }
}
```
