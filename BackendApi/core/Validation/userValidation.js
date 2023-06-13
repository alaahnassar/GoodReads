const { body, param, query } = require("express-validator");

module.exports.addUserValidator = [
  body("firstname")
    .isAlpha()
    .withMessage("First name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("First name must be less than 10 and more 3 chars"),
  body("lastname")
    .isAlpha()
    .withMessage("Last name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("Last name must be less than 10 and more 3 chars"),
  body("email")
    .isEmail()
    .withMessage("Email must be in email format"),
  body("password")
    .isString()
    .isLength({ min: 5 })
    .withMessage("password  must be string and more than 5 chars"),
];
module.exports.loginUserValidator = [
  body("email").isEmail().withMessage("Email must be in email format"),
  body("password")
    .isString()
    .isLength({ min: 5 })
    .withMessage("password  must be string and more than 5 chars"),
];

module.exports.updateUserValidator = [
  param("id").isMongoId().withMessage("User id dosen't exist"),
  body("firstname")
    .isAlpha()
    .withMessage("First name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("First name must be less than 10 and more 3 chars"),
  body("lastname")
    .isAlpha()
    .withMessage("Last name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("Last name must be less than 10 and more 3 chars"),

  body("email").isEmail().withMessage("Email must be in email format"),

  body("password")
    .isString()
    .isLength({ min: 5 })
    .withMessage("password  must be string and more than 5 chars"),
];

module.exports.deleteUserValidator = [
  param("id").isMongoId().withMessage("User id is must be valid"),
];

module.exports.getUserByIdValidator = [
  param("id").isMongoId().withMessage("The User id is doesn't exist"),
];
