const { Router } = require("express");
const PostRouter = require("./post.router");
const UserRouter = require("./user.router");
const CommentRouter = require("./comment.router");

const postRouter = new PostRouter();
const userRouter = new UserRouter();
const commentRouter = new CommentRouter();

const mainRouter = Router();

mainRouter.use("/", postRouter.init());
mainRouter.use("/", userRouter.init());
mainRouter.use("/", commentRouter.init());

module.exports = { mainRouter };