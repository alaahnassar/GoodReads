const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Assets/images/bookimages");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9) + ".jpg";
    // console.log("test config image")
    // console.log(uniqueSuffix);
    // cb(null, uniqueSuffix);
    cb(null, Date.now() + "-" + file.originalname); // Set the filename of the uploaded image
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
