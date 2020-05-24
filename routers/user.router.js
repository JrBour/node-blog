const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.schema');
const PostModel = require('../models/post.schema');

const privateKey = fs.readFileSync('config/jwt/private.pem');

class UserRouter {
  constructor() {
    this.router = express.Router();
    this.passphrase = process.env.PASSPHRASE;
  };

  routes() {
    this.router.post('/auth/register', (req, res) => {
      bcrypt.hash(req.body.password, 10)
        .then(hashedPassword => {
          req.body.password = hashedPassword;

          UserModel.create(req.body)
            .then(data => res.status(201).json({ data }))
            .catch(error => res.status(502).json({ error }));
        })
        .catch(hashError => res.status(500).json({
          error: hashError,
        }));
    });

    this.router.post('/auth/login', (req, res) => {
      UserModel.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          const validPassword = bcrypt.compareSync(req.body.password, user.password);
          if (!validPassword) {
            return res.status(500).json({ error: 'Invalid password' });
          } else {
            return res.status(201).json({ token: jwt.sign({ ...user }, {key: privateKey, passphrase: this.passphrase }, { algorithm: 'RS256' }) });
          };
        };
      });
    });

    this.router.get('/users/:id', (req, res) => {
      UserModel.findById(req.params.id)
        .then(data => res.status(200).json({ data }))
        .catch(error => res.status(502).json({ error }));
    });

    this.router.get('/users/:id/posts', (req, res) => {
      PostModel.find({ author: req.params.id })
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(502).json({ error }));
    });
  };

  init() {
    this.routes();

    return this.router;
  };
};

module.exports = UserRouter;