const express = require("express");
const categoryRouter = express.Router();
const categoryControllers = require("../../Controllers/Category/categoryController");
const categoryValidator = require("../../core/Validation/categryValidation");
const checkValidation = require("../../core/Validation/checkValidation");

categoryRouter
  .route("/admin/categories")
  .get(categoryControllers.getAllCategories)
  .post(
    categoryValidator.categoryValidatorForName,
    checkValidation,
    categoryControllers.createCategroy
  )
  .patch(
    categoryValidator.categoryValidatorForNameAndId,
    checkValidation,
    categoryControllers.upadtecatgeroy
  )
  .delete(
    categoryValidator.categoryValidatorForId,
    checkValidation,
    categoryControllers.deletecatgeroy
  );
categoryRouter.get(
  "admin/categories/:id",
  categoryControllers.getCategoryById
);
module.exports = categoryRouter;
