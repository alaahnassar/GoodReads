const express = require("express");
const userRouter = express.Router();
const {
  getUserById,
  updateBookView,
  getAll,
} = require("../../Controllers/User/userController");
const { checkUser, checkBook } = require("../../core/notFound/userNotFound");
userRouter
  .route("/user/:id")
  .get(checkUser, getUserById)
  .patch(checkUser, checkBook, updateBookView);

userRouter.get("/user", getAll);
module.exports = userRouter;
