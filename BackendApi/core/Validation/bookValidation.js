const { body } = require("express-validator");

const bookValidationForCreate = [
  body("name").notEmpty().isString().withMessage(" Name is required"),
  body("author_id").isMongoId().notEmpty().withMessage("Auothor is required"),
  body("category_id")
    .isMongoId()
    .notEmpty()
    .withMessage(" category is required"),
];
const bookValidationForUpdate = [
  body("id").isMongoId().notEmpty().withMessage("Book ID is required"),
  body("name").notEmpty().isAlpha().withMessage(" Name is required"),
  body("author_id").isMongoId().notEmpty().withMessage("Auothor is required"),
  body("category_id")
    .isMongoId()
    .notEmpty()
    .withMessage(" category is required"),
];
const bookValidationForDelete = [
  body("id").isMongoId().notEmpty().withMessage("Book ID is required"),
];

module.exports = {
  bookValidationForCreate,
  bookValidationForUpdate,
  bookValidationForDelete,
};
