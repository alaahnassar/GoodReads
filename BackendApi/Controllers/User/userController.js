const mongoose = require("mongoose");
require("../../Models/UserSchema");
const userSchema = mongoose.model("User");
require("../../Models/BookShema");
const bookSchema = mongoose.model("Book");

getAll = (req, res, next) => {
  userSchema
    .find({})
    .populate({
      path: "books.book_id",
      populate: [
        { path: "author_id", select: { firstname: 1, lastname: 1 } },
        { path: "category_id", select: { name: 1 } },
      ],
    })
    .then((data) => res.json(data));
};

getUserById = (req, res, next) => {
  userSchema
    .findOne({ _id: req.params.id })
    .populate({
      path: "books.book_id",
      populate: [
        { path: "author_id", select: { firstname: 1, lastname: 1 } },
        { path: "category_id", select: { name: 1 } },
      ],
    })
    .then((data) => {
      if (!req.query.view) {
        res.json(data);
      } else if (req.query.view == "all") {
        res.json(data.books);
      } else {
        let books = data.books;
        let newBooks = books.filter(
          (element) => element.view == req.query.view
        );
        res.status(200).json(newBooks);
      }
    })
    .catch((err) => next(err));
};

updateBookView = (req, res, next) => {
  userSchema
    .updateOne(
      { _id: req.params.id, "books.book_id": req.body.book_id },
      {
        $set: {
          "books.$.view": req.body.view,
        },
      }
    )
    .then((data) => {
      res.status(201).json({ data: "data updated" });
    })
    .catch((err) => {
      next(err);
    });
};

// addUser = (req, res, next) => {
//   if (req.body.retypePassword == req.body.password) {
//     let newUser;
//     if (req.file) {
//       newUser = new userSchema({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         password: req.body.password,
//         image: req.file.path, // Save the path of the uploaded image
//       });
//     } else {
//       newUser = new userSchema({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         password: req.body.password,
//       });
//     }
//     console.log(newUser);
//     newUser
//       .save()
//       .then((data) => {
//         res.status(201).json({ data });
//       })
//       .catch((err) => next(err));
//   } else {
//     let error = new Error("error password");
//     error.status = 500;
//     next(error);
//   }
// };

// Assuming you have an endpoint for registration '/register'

addUser = async (req, res, next) => {
  try {
    if (req.body.retypePassword == req.body.password) {
      let newUser;
      if (req.file) {
        newUser = new userSchema({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          image: req.file.path, // Save the path of the uploaded image
        });
      } else {
        newUser = new userSchema({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
        });
      }
      // console.log(newUser);

      // Code to check if the email is already registered
      const existingUser = await userSchema.findOne({ email: req.body.email });
      // console.log(existingUser);
      if (existingUser) {
        // Return an error response with a specific message for duplicate email
        console.log(existingUser + "else");
        return res
          .status(400)
          .json({ message: "This email is already registered." });
      }
      // Save the new user
      const savedUser = await newUser.save();
      // Return a success response
      return res.status(201).json({ data: savedUser });
    } else {
      // Passwords do not match
      const error = new Error("Passwords do not match.");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    // Handle errors
    // console.error(error);
    next(error);
  }
};

updateUser = (req, res, next) => {
  userSchema
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
        },
      }
    )
    .then((data) => res.status(200).json({ data: "updated" }))
    .catch((err) => next(err));
};

deleteUser = (req, res, next) => {
  userSchema
    .deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(400).json({ data });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUserById,
  updateBookView,
  getAll,
  addUser,
  updateUser,
  deleteUser,
};
