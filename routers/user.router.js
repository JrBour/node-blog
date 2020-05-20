const express = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.schema');

class UserRouter {
  constructor() {
    this.router = express.Router();
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
            return res.status(201).json({ data: user });
          };
        };
      });
    });
  };

  init() {
    this.routes();

    return this.router;
  };
};

module.exports = UserRouter;