const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  image: {
    data: Buffer,
    contentType: {
      type: String
    }
  }
  // image: { type: String },
});

const Author = mongoose.model("Author", AuthorSchema);
