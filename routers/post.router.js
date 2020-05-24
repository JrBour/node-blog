const express = require('express');
const path = require("path");
const multer = require("multer");
const PostModel = require('../models/post.schema');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'www/uploads/')
  },
  filename: function (req, file, cb) {
    const fileSplit = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileSplit[fileSplit.length -1])
  }
})

const upload = multer({ storage });



class PostRouter {
  constructor() {
    this.router = express.Router();
  };

  routes() {
    this.router.post('/posts', upload.single('cover'), (req, res) => {
      const post = {
        ...req.body,
        cover: req.file.filename
      }
      PostModel.create(post)
        .then((data) => res.status(201).json({ data }))
        .catch((error) => res.status(502).json({ error }));
    });

    this.router.get('/posts', (req, res) => {
      PostModel.find().populate('author')
        .then(data => res.status(200).json({ data }))
        .catch(error => res.status(502).json({ error }));
    });

    this.router.get('/posts/search', (req, res) => {
      const regexQuery = {
        title: new RegExp(req.query.title, 'i')
      };
      PostModel.find(regexQuery)
        .then(data => res.status(200).json({ data }))
        .catch(error => res.status(502).json({ error }));
    })

    this.router.get('/posts/:id', (req, res) => {
      PostModel.findById(req.params.id).populate('author')
        .then(data => res.status(200).json({ data }))
        .catch(error => res.status(502).json({ error }));
    });

    this.router.put('/posts/:id', upload.single('cover'), (req, res) => {
      const post = {
        ...req.body,
        cover: req.file.filename
      }

      PostModel.findById(req.params.id)
        .then(post => {
          post.title = req.body.title;
          post.content = req.body.content;
          post.author = req.body.author;
          post.cover = req.file.filename;
          
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