const upload =require("../../core/upload_Image/uploadImage")

let saveImage = (req, res, next) => {
    upload.single("file")
    console.log(req.file)
    console.log("test save image")
    next();
 };



module.exports= saveImage;