const multer=require("multer");

//defin file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date().toISOString().replace(/:/g, "-") + file.originalname )
    }
  })

  //specify file that can be saved
  function fileFilter (req, file, cb) {

   if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" 
   ) {
    cb(null, true)
   }else{
    cb(null, false)
   }

  
  }


  const upload = multer({ storage, fileFilter })

  module.exports = {upload};