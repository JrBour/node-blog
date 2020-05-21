const express = require("express");
const CommentModel = require("../models/comment.schema");

class PostRouter {
  constructor() {
    this.router = express.Router();
  }

  routes() {
    this.router.post("/comments", (req, res) => {
      CommentModel.create(req.body)
        .then((data) => res.status(201).json({ data }))
        .catch((error) => res.status(502).json({ error }));
    });

    this.router.get("/comments", (req, res) => {
      CommentModel.find()
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(502).json({ error }));
    });

    this.router.get("/comments/:id", (req, res) => {
      CommentModel.findById(req.params.id)
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(502).json({ error }));
    });

    this.router.put("/comments/:id", (req, res) => {
      CommentModel.findById(req.params.id)
        .then((post) => {
          post.title = req.body.title;
          post.content = req.body.content;

          post
            .save()
            .then((data) => res.status(200).json({ data }))
            .catch((error) => res.status(502).json({ error }));
        })
        .catch((error) => res.status(404).json({ error }));
    });

    this.router.delete("/comments/:id", (req, res) => {
      CommentModel.findOneAndDelete({ _id: req.params.id })
        .then(() => res.status(204).json())
        .catch((error) => res.status(404).json({ error }));
    });
  }

  init() {
    this.routes();

    return this.router;
  }
}

module.exports = PostRouter;
