const mongoose = require("mongoose");
require("../../Models/UserSchema");
require("../../Models/BookShema");
const userSchema = mongoose.model("User");
const bookSchema = mongoose.model("Book");

checkUser = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new Error("please enter a valid user id");

  userSchema
    .findOne({ _id: req.params.id })
    .then((data) => {
      if (data == null) throw new Error("user not found");

      next();
    })
    .catch((err) => next(err));
};

checkBook = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.book_id))
    throw new Error("please enter a valid book id");

  bookSchema
    .findOne({ _id: req.body.book_id })
    .then((data) => {
      if (data == null) throw new Error("book not found");

      next();
    })
    .catch((err) => next(err));
};

module.exports = {
  checkUser,
  checkBook,
};
