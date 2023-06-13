const express = require("express");
const usercategoryRouter = express.Router();
const categoryControllers = require("../../Controllers/Category/categoryController");

usercategoryRouter.get('/allCategory', categoryControllers.getAllCategories);
usercategoryRouter.post('/addBook', categoryControllers.addBook);
usercategoryRouter.get('/allCategory/:id', categoryControllers.getCategoryById);

module.exports = usercategoryRouter;
