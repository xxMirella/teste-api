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
        "name": "String",
        "birthday": "String(Date)",
        "email": "String",
        "address": {
            "street": "String",
            "number": "Integer",
            "complement": "String",
            "neighborhood": "String",
            "city": "String",
            "country": "String",
            "_id": "String"
        },
        "_id": "String"
    },
    "TokenLogin": {
        "token": "String"
    }
}
```
