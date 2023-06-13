const express = require('express');
const authorController = require("./../../Controllers/Author/authorController");
const authorization = require("./../../core/Authorization/Authorization");
const uploadImage = require("./../../core/upload_Image/authorImages");
const authorValidation = require("./../../core/Validation/authorValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const authorRoute = express.Router();

authorRoute.route("/authorsBooks")
  .get(authorController.checkBook)

  .post(authorController.addBook);

authorRoute.route("/authorsBooks/:id")
  .get(authorValidation.getAuthorByIdValidator,
    checkValidation,
    authorController.getBooksByAuthorId)

// .patch(authorController.addBookUser)

authorRoute.route("/checkBook/:id")
  .patch(
    authorValidation.checkId,
    checkValidation,
    authorController.checkBook)

// authorRoute.route("/checkBookRate/:id")
//   .get(authorController.checkBookRate)

module.exports = authorRoute
