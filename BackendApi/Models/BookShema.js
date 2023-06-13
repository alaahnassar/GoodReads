const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  // book_image: { type: String },
  book_image: {
    data: Buffer,
    contentType: {
      type: String
    }
  },
  numberOfReviews: { type: Number },
  totalOfReviews: { type: Number },
  bookDescription: { type: String, default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
});

const Book = mongoose.model("Book", BookSchema);
