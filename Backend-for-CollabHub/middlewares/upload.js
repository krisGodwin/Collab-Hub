const multer = require("multer")
const path = require("path")
const {v4 : uuidv4} = require("uuid")
const filestorage = multer.diskStorage({
  destination : 'images',
  filename : (req,file,cb) => {
      cb(null,file.fieldname + '_' + Date.now() + uuidv4() + path.extname(file.originalname))
  }
})
const fileUpload = multer({
  storage : filestorage,
  limits : {
      fileSize : 10000000
  },
  fileFilter (req,file,cb){
      if(!file.originalname.match(/\.(jpg|png)$/))
      {
          return cb(new Error('Please upload a image file'))
      }
      cb(undefined,true)
  }
})
module.exports = fileUpload