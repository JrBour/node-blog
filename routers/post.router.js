const express = require('express');
const PostModel = require('../models/post.schema');

class PostRouter {
  constructor() {
    this.router = express.Router();
  };

  routes() {
    this.router.post('/posts', (req, res) => {
      PostModel.create(req.body)
        .then(data => res.status(201).json({ data }))
        .catch(error => res.status(502).json({ error }));
    });

    this.router.get('/posts', (req, res) => {
      PostModel.find()
        .then(data => res.status(200).json({ data }))
        .catch(error => res.status(502).json({ error }));
    });

    this.router.get('/posts/:id', (req, res) => {
      PostModel.findById(req.params.id)
        .then(data => res.status(200).json({ data }))
        .catch(error => res.status(502).json({ error }));
    });

    this.router.put('/posts/:id', (req, res) => {
      PostModel.findById(req.params.id)
        .then(post => {
          post.title = req.body.title;
          post.content = req.body.content;

          post.save()
            .then(data => res.status(200).json({ data }))
            .catch(error => res.status(502).json({ error }))

        })
        .catch(error => res.status(404).json({ error }))
    });

    this.router.delete('/posts/:id', (req, res) => {
      PostModel.findOneAndDelete({ _id: req.params.id })
        .then(() => res.status(204).json())
        .catch(error => res.status(404).json({ error }))
    });
  };

  init() {
    this.routes();

    return this.router;
  };
};

module.exports = PostRouter;