const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model("User");

module.exports.authenticationLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    let error = new Error("Please enter email and password.");
    error.status = 400;
    throw error;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        let error = new Error("Invalid email or password.");
        error.status = 401;
        throw error;
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (isMatch) {
        const token = jwt.sign(
          {
            role: user.role,
            id: user._id,
          },
          process.env.SECRET_KEY
        );
        // req.session.token = token;
        res.status(200).json({ message: "User authenticated.", token });
      } else {
        let error = new Error("Invalid email or password.");
        error.status = 401;
        throw error;
      }
    })
    .catch((error) => next(error));
};
