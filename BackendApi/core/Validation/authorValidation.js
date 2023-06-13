const { body, param, query } = require("express-validator");

module.exports.addAuthorValidator = [
  body("firstname")
    .isAlpha()
    .withMessage("First name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("First name must be less than 10 and more 3 chars"),
  body("lastname")
    .isAlpha()
    .withMessage("Last name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("Last name must be less than 10 and more 3 chars")
];

module.exports.updateAuthorValidator = [
  param("id").isMongoId().withMessage("Author id dosen't exist"),
  body("firstname")
    .isAlpha()
    .withMessage("First name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("First name must be less than 10 and more 3 chars"),
  body("lastname")
    .isAlpha()
    .withMessage("Last name must be characters only")
    .isLength({ min: 3, max: 10 })
    .withMessage("Last name must be less than 10 and more 3 chars")
];

module.exports.deleteAuthorValidator = [
  param("id").isMongoId().withMessage("Author id is must be valid"),
];

module.exports.getAuthorByIdValidator = [
  param("id").isMongoId().withMessage("The Author id is doesn't exist"),
];

// Custom validation function for the 'view' field
const isValidView = (value) => {
  const validValues = ['read', 'reading', 'wantToRead'];
  return validValues.includes(value);
};
module.exports.checkId = [
  param("id").isMongoId().withMessage("This id doesn't exist"),
  body("book_id").isMongoId().withMessage("This id doesn't exist"),
  body("rate").optional().isInt().withMessage("Rate should be integer").isLength({ min: 0, max: 5 }),
  body('view').optional().custom(isValidView).withMessage('Invalid view value'),
];
