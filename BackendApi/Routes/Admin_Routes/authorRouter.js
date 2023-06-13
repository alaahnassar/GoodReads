const express = require('express');
const authorController = require("./../../Controllers/Author/authorController");
const authorization = require("./../../core/Authorization/Authorization");
const uploadImage = require("./../../core/upload_Image/authorImages");
const authorValidation = require("./../../core/Validation/authorValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const authorRoute = express.Router();

authorRoute.route("/authors")
  .get(
    authorController.getAllAuthors)
  .post(uploadImage.single("image"),
    authorController.addAuthor);
authorRoute.route("/authors/:id")
  .get(authorValidation.getAuthorByIdValidator,
    checkValidation,
    authorController.getAuthorById)
  .patch(uploadImage.single("image"),
    authorValidation.updateAuthorValidator,
    checkValidation,
    authorController.updateAuthor)
  .delete(authorValidation.deleteAuthorValidator,
    checkValidation,
    authorController.deleteAuthor);

module.exports = authorRoute;
