## Authentication API

Signup - POST
url: `/auth/signup`
params:

```
{
    "name":"Mihir Kumar",
    "email":"mihir@gmail.com",
    "password":"mihir"
}
```

response if successful:

```
{
    "error": False,
    "message":"User Regitation successful"
}
```

response if unsuccessul

```
{
    "error": True,
    "message": "Registration failed, user already exists"

}
```

Login - POST url - `/auth/login`
params:

```
{
    "email":"mihir@gmail.com",
    "password":"mihir"
}
```

response:
success

```
{
  "error": false,
  "token": "cc4a5ce1b3df48aec5d22d1f16b894a0b894eccc"
}
```

Failure

```
{
  "error": true,
  "message": "Invalid login creadentials"
}
```
