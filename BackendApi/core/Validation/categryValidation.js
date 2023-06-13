const { body } = require("express-validator");

const categoryValidatorForName = [
  body("name").isAlpha().notEmpty().withMessage("Category Name Is not Valid"),
];
const categoryValidatorForNameAndId = [
  body("name")
    .isAlpha()
    .notEmpty()
    .trim()
    .withMessage("Category Name Is not Valid"),
  body("id").isMongoId().notEmpty().withMessage("ID is Required"),
];
const categoryValidatorForId = [
  body("id").isMongoId().notEmpty().withMessage("ID is Required"),
];

module.exports = {
  categoryValidatorForName,
  categoryValidatorForNameAndId,
  categoryValidatorForId,
};
