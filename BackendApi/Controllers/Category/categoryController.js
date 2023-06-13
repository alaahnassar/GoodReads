const mongoose = require("mongoose");
const categoryModel = mongoose.model("Category");
const bookModel = mongoose.model("Book");
const userModel = mongoose.model("User");
const { ObjectId } = require("mongoose").Types;
// require("../../Models/BookShema");
// require("../../Models/CategorySchema");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      res.status(404).json({ message: "category" });
    }
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const books = await bookModel.find({ category_id: categoryId }).populate([
      {
        path: "author_id",
        select: { firstname: 1, lastname: 1 },
      },
      {
        path: "category_id",
      },
    ]);
    if (!books || books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found for this category" });
    }
    res.json(books);
  } catch (error) {
    next(error);
  }
};

const getcategoryById =async (req,res,next) => {
  try {
       const categoryId = req.params.id;
    const category = await categoryModel.findById(categoryId);
    res.status(200).json({ data: category });
  } catch (error) {
    next(error)
  }
}
let createCategroy = async (req, res, next) => {
  try {
    const category = new categoryModel({
      name: req.body.name,
      
    });
    category.save();
    res.status(200).json({ data: category });
  } catch (error) {
    next(error);
  }
};

let upadtecatgeroy = async (req, res, next) => {
  try {
    const catgeroy = await categoryModel.findOneAndUpdate(
      { _id: req.body.id },
      { name: req.body.name },
      { new: true }
    );
    res.status(200).json({ data: catgeroy });
  } catch (error) {
    next(error);
  }
};

// let deletecatgeroy = async (req, res, next) => {
//   // console.log(req.body.id);
//   try {
//     let data = await categoryModel.deleteOne({ _id: req.body.id });
//     res.status(200).json({ message: "delete categeroy" });
//   } catch (error) {
//     next(error);
//   }
// };

let deletecatgeroy = (req, res, next) => {
  const categoryId = req.body.id;

  // Fetch all books associated with the author
  bookModel.find({ category_id: categoryId })
    .then((books) => {
      // Remove each book from users' data
      const bookIds = books.map((book) => book._id);
      return userModel.updateMany({}, { $pull: { books: { book_id: { $in: bookIds } } } });
    })
    .then(() => {
      // Delete all books associated with the author
      return bookModel.deleteMany({ category_id: categoryId });
    })
    .then(() => {
      // Delete the author
      return categoryModel.deleteOne({ _id: categoryId });
    })
    .then(() => {
      res.status(200).json({ message: "Author and associated books deleted successfully." });
    })
    .catch((error) => {
      next(error);
    });
};

const addBook = (req, res, next) => {
  newAuthor = new bookModel({
    name: req.body.name,
    author_id: req.body.author_id,
    category_id: req.body.category_id,
  });
  newAuthor
    .save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((err) => next(err));
};
// module.exports.getBooksByAuthorId = (req, res, next) => {
//   bookSchema
//     .find({})
//     .populate("author_id")
//     .exec()
//     .then((data) => {
//       const filter = data.filter((book) => {
//         // check if book and rate exist in user data --> put status book and rate in variable --> default value "want to read" "0"
//         return book.author_id._id == req.params.id
//       })
//       res.status(200).json({ filter });
//     })
//     .catch((err) => next(err));
// };
//
module.exports = {
  createCategroy,
  upadtecatgeroy,
  deletecatgeroy,
  getAllCategories,
  getCategoryById,
  addBook,
  getcategoryById,
};
