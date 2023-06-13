const mongoose = require("mongoose");
const authorSchema = mongoose.model("Author");
const bookSchema = mongoose.model("Book");
const userSchema = mongoose.model("User");

module.exports.getAllAuthors = (req, res, next) => {
  authorSchema
    .find({})
    .then((data) => {
      const formattedData = data.map((author) => {
        const formattedDateOfBirth = `${author.dateOfBirth.getFullYear()}-${(
          author.dateOfBirth.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${author.dateOfBirth
            .getDate()
            .toString()
            .padStart(2, "0")}`;

        return { ...author.toJSON(), dateOfBirth: formattedDateOfBirth };
      });

      res.status(200).json({ data: formattedData });
    })
    .catch((err) => next(err));
};

module.exports.getAuthorById = (req, res, next) => {
  authorSchema
    .findOne({ _id: req.params.id })
    .then((data) => {
      if (data == null) throw new Error("Author not found");
      else {
        const formattedDateOfBirth = `${data.dateOfBirth.getFullYear()}-${(data.dateOfBirth.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${data.dateOfBirth.getDate().toString().padStart(2, '0')}`;

        const formattedData = { ...data.toJSON(), dateOfBirth: formattedDateOfBirth };

        res.status(200).json({ data: formattedData });
      }
    })
    .catch((err) => next(err));
};

const fs = require('fs');
module.exports.addAuthor = (req, res, next) => {
  let newAuthor;
  newAuthor = new authorSchema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    dateOfBirth: new Date(req.body.dateOfBirth),
  });

  // If a file is present, save the file data to the image field
  if (req.file) {
    const imageBuffer = fs.readFileSync(req.file.path);
    newAuthor.image = {
      data: imageBuffer,
      contentType: req.file.mimetype,
    };
  } else {
    // Set default image data and content type
    const defaultImageBuffer = fs.readFileSync('Assets/images/authorImages/anonymous.png'); // Replace 'path_to_default_image' with the actual path to your default image
    newAuthor.image = {
      data: defaultImageBuffer,
      contentType: 'image/png', // Replace 'image/png' with the appropriate content type of your default image
    };
  }

  newAuthor
    .save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((err) => next(err));
};

module.exports.updateAuthor = (req, res, next) => {
  authorSchema
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          dateOfBirth: req.body.dateOfBirth,
          ...(req.file && { image: { data: fs.readFileSync(req.file.path), contentType: req.file.mimetype } }), // Update the image if req.file exists
        },
      }
    )
    .then((data) => {
      // Fetch the updated author data after the update operation
      authorSchema.findById(req.params.id)
        .then((updatedAuthor) => {
          res.status(200).json({ data: updatedAuthor, message: "updated" });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.deleteAuthor = (req, res, next) => {
  const authorId = req.params.id;

  // Fetch all books associated with the author
  bookSchema.find({ author_id: authorId })
    .then((books) => {
      // Remove each book from users' data
      const bookIds = books.map((book) => book._id);
      return userSchema.updateMany({}, { $pull: { books: { book_id: { $in: bookIds } } } });
    })
    .then(() => {
      // Delete all books associated with the author
      return bookSchema.deleteMany({ author_id: authorId });
    })
    .then(() => {
      // Delete the author
      return authorSchema.deleteOne({ _id: authorId });
    })
    .then(() => {
      res.status(200).json({ message: "Author and associated books deleted successfully." });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getBooksByAuthorId = (req, res, next) => {
  bookSchema
    .find({ author_id: req.params.id })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => next(err));
};

module.exports.addBook = (req, res, next) => {
  newAuthor = new bookSchema({
    name: req.body.name,
    author_id: req.body.author_id,
    category_id: req.body.category_id,
    numberOfReviews: 0,
    totalOfReviews: 0,
  });
  newAuthor
    .save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((err) => next(err));
};

// const addBookUser = (data) => {
//   let bookData = [];
//   bookData.push(data.bookData);
//   return new Promise((resolve, reject) => {
//     userSchema
//       .updateOne(
//         { _id: data.id },
//         {
//           $push: {
//             books: { $each: bookData },
//           },
//         }
//       )
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

module.exports.checkBook = (req, res, next) => {
  if (!req.body.rate) {
    // change book view
    userSchema
      .findOneAndUpdate(
        {
          _id: req.params.id,
          "books.book_id": req.body.book_id,
        },
        {
          $set: {
            "books.$.view": req.body.view,
          },
        }
      )
      .then((data) => {
        if (!data) {
          // Book not found in user data, add the book
          return userSchema.findOneAndUpdate(
            { _id: req.params.id },
            {
              $push: {
                books: {
                  book_id: req.body.book_id,
                  rate: 0,
                  view: req.body.view,
                },
              },
            },
            { new: true } // Return the updated user data after adding the book
          );
        }

        // Book view updated successfully
        return data;
      })
      .then((updatedData) => {
        res.status(200).json({ data: updatedData });
      })
      .catch((err) => next(err));
  } else {
    // change book rate
    userSchema
      .findOne({ _id: req.params.id })
      .then((data) => {
        if (data == null) throw new Error("User not found");
        else {
          const bookIndex = data.books.findIndex(
            (book) => book.book_id.toString() === req.body.book_id
          );
          if (bookIndex !== -1) {
            // Book exists in user data
            const oldValue = data.books[bookIndex].rate;

            return userSchema
              .findOneAndUpdate(
                {
                  _id: req.params.id,
                  "books.book_id": req.body.book_id,
                },
                {
                  $set: {
                    "books.$.rate": req.body.rate,
                  },
                }
              )
              .then((updatedData) => {
                //  Update the book's numberOfReviews and totalOfReviews
                const increment =
                  Number(oldValue) > Number(req.body.rate)
                    ? -(Number(oldValue) - Number(req.body.rate))
                    : Number(req.body.rate) - Number(oldValue);
                const numberOfReviews = Number(oldValue) == 0 ? 1 : 0;

                return bookSchema
                  .findOneAndUpdate(
                    {
                      _id: req.body.book_id,
                    },
                    {
                      $inc: {
                        numberOfReviews: numberOfReviews,
                        totalOfReviews: increment,
                      },
                    },
                    { new: true }
                  )
                  .then((updatedBookData) => {
                    return { bookData: updatedBookData };
                  });
              })
              .then(({ data, bookData }) => {
                res.status(200).json({ data, bookData });
              })
              .catch((err) => next(err));
          } else {
            return userSchema
              .findOneAndUpdate(
                { _id: req.params.id },
                {
                  $push: {
                    books: {
                      book_id: req.body.book_id,
                      rate: req.body.rate,
                      view: "wantToRead",
                    },
                  },
                },
                { new: true } // Return the updated user data after adding the book
              )
              .then((updatedData) => {
                //  Update the book's numberOfReviews and totalOfReviews
                return bookSchema
                  .findOneAndUpdate(
                    {
                      _id: req.body.book_id,
                    },
                    {
                      $inc: {
                        numberOfReviews: 1,
                        totalOfReviews: req.body.rate,
                      },
                    },
                    { new: true }
                  )
                  .then((updatedBookData) => {
                    return { bookData: updatedBookData };
                  });
              })
              .then(({ data, bookData }) => {
                res.status(200).json({ data, bookData });
              })
              .catch((err) => next(err));
          }
        }
      })
      .catch((err) => next(err));
  }
};
