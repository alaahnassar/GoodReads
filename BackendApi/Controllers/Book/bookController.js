const mongoose = require("mongoose");
require("../../Models/BookShema");
const bookModel = mongoose.model("Book");
const userModel = mongoose.model("User");

let getAllBooks = async (req, res, next) => {
  try {
    const books = await bookModel.find({}).populate([
      {
        path: "author_id",
        select: { firstname: 1, lastname: 1 },
      },
      {
        path: "category_id",
      },
    ]);
    res.status(200).json({ data: books });
  } catch (error) {
    next(error);
  }
};

let getOneBook = async (req, res, next) => {
  try {
    const book = await bookModel
      .findOne({ _id: req.params.id })
      .populate({ path: "author_id", select: "firstname lastname " })
      .populate({ path: "category_id", select: "name " });
    res.status(200).json({ data: book });
  } catch (error) {
    next(error);
  }
};

const fs = require('fs');
let createOneBook = async (req, res, next) => {
  try {
    const imageBuffer = fs.readFileSync(req.file.path);
    const book = bookModel({
      name: req.body.name,
      author_id: req.body.author_id,
      category_id: req.body.category_id,
      book_image: {
        data: imageBuffer,
        contentType: req.file.mimetype,
      },
      bookDescription: req.body.bookDescription,
    });

    book.save();
    res.status(200).json({ data: book });
  } catch (error) {
    next(error);
  }
};

let updateOneBook = async (req, res, next) => {
  try {
    const imageBuffer = fs.readFileSync(req.file.path);
    const book = await bookModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.name,
        author_id: req.body.author_id,
        category_id: req.body.category_id,
        book_image: {
          data: imageBuffer,
          contentType: req.file.mimetype,
        },
      },
      { new: true }
    );
    res.status(200).json({ data: book });
  } catch (error) {
    next(error);
  }
};

let deleteOneBook = (req, res, next) => {
  const bookId = req.body.id;

  bookModel
    .findOne({ _id: bookId })
    .then((book) => {
      return userModel.updateMany(
        {},
        { $pull: { books: { book_id: { $in: book._id } } } }
      );
    })
    .then(() => {
      return bookModel.deleteOne({ _id: bookId });
    })
    .then(() => {
      res.status(200).json({ message: "book deleted successfully." });
    })
    .catch((error) => {
      next(error);
    });
};
let getPopularBooks = async (req, res, next) => {
  try {
    const books = await bookModel
      .find({})
      .sort({ totalOfReviews: -1 })
      .limit(3)
      .populate([
        {
          path: "author_id",
          select: { firstname: 1, lastname: 1 },
        },
        {
          path: "category_id",
        },
      ]);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  createOneBook,
  updateOneBook,
  deleteOneBook,
  getPopularBooks,
};
