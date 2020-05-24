# Node api

This project is a school project. The goal is to create a REST API for create/read/update/delete users, posts and comments.
Before to launch the projet, add mongo url, port and cookie secret in `.env` file

## Launch the project

First create a private and public key in `config/jwt` folder

```bash
openssl genrsa -out config/jwt/private.pem -aes256 4096
openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
cp .env.dist .env
```

Set the passphrase, mongodb url, your cookie secret and your port in `.env` file. And then, run `npm start`.

## Packages

* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* [multer](https://github.com/expressjs/multer)
* [mongoose](https://github.com/Automattic/mongoose)
* [passport](https://github.com/jaredhanson/passport)