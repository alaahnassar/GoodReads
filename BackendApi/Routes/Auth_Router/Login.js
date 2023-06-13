const express = require("express");

const authenticationController = require("./../../Controllers/Authentication/AuthenticationController");
const userValidation = require("./../../core/Validation/userValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const authenticationRouter = express.Router();

authenticationRouter
  .route("/login")
  .post(
    userValidation.loginUserValidator,
    checkValidation,
    authenticationController.authenticationLogin
  );

module.exports = authenticationRouter;
