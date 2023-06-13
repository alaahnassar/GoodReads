const jwt = require("jsonwebtoken");
const express = require("express");
module.exports = (req, res, next) => {
  try {
    const token = req.get("authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.role = decodedToken.role;
    req.id = decodedToken.id;
    next();
  } catch (error) {
    error.message = "Not Authenticated";
    error.status = 401;
    next(error);
  }
};

module.exports.checkAdmin = (req, res, next) => {
  if (req.role === "admin") next();
  else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.checkUser = (req, res, next) => {
  console.log("check user autherization ");
  if (req.role === "user") next();
  else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};
