const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("./Models/AuthorShema");
require("./Models/BookShema");
require("./Models/CategorySchema");
require("./Models/UserSchema");
const path = require("path");
const authorBooksRoute = require("./Routes/User_Routes/authorRouter");
const authenticationRoute = require("./Routes/Auth_Router/Login");
const registerRoute = require("./Routes/Auth_Router/Register");
const authorRoute = require("./Routes/Admin_Routes/authorRouter");
const authorizationMW = require("./core/Authorization/Authorization");
const usercategoryRouter = require("./Routes/User_Routes/categoryRouter");
const admincategoryRouter = require("./Routes/Admin_Routes/categoryRouter");
const adminBookRouter = require("./Routes/Admin_Routes/bookRouter");
const app = express();
const userRouter = require("./Routes/User_Routes/userRouter");
var cors = require("cors");

//connect to database
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Example app listening on port 8080!");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());
//  first layer logging middleware

app.use(cors());

app.use(express.urlencoded({ extended: false }));
// app.use(
//   "/images",
//   express.static(path.join(__dirname, "bookimages"))
// );

app.use(userRouter);
app.use(usercategoryRouter);
app.use(admincategoryRouter);
app.use(adminBookRouter);
app.use(usercategoryRouter);
app.use(admincategoryRouter);
// app.use(adminBookRouter);

app.use(usercategoryRouter);
app.use(admincategoryRouter);
app.use(adminBookRouter);

//  middelware layers of routing and authentication
app.use(registerRoute);
app.use(authenticationRoute);
app.use(authorizationMW);
app.use(authorRoute);
app.use(authorBooksRoute);

//  third layer no page found
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found" });
});

// fourth layer for handling errors
app.use((err, req, res, next) => {
  res.status(500).json({ message: err + " " });
});

app.use("/images", express.static(path.join(__dirname, "")));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
// module.exports = app;
