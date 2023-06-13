const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 4, max: 10 },
  books: [
    {
      book_id: { type: Schema.Types.ObjectId, ref: "Book" },
      rate: { type: Number, max: 5 },
      view: {
        type: String,
        required: true,
        enum: ["read", "wantToRead", "reading"],
      },
    },
  ],
  image: {
    type: String,
    required: false,
    default: "Assets\\images\\userIamges\\anonymous.png",
  },
  role: { type: String, required: true, default: "user" },
});
// for hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate();

  if (!update.password || !update.password.length) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(update.password, 10);
    this.update({ password: hash });
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", UserSchema);
