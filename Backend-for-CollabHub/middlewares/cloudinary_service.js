const cloudinary = require('cloudinary').v2;
require("dotenv").config()
cloudinary.config({
    cloud_name : process.env.cloud_name,
    api_key : process.env.api_key,
    api_secret : process.env.api_secret,
    secure: true
});
const uploadImage = async (imagePath) => {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};
module.exports = uploadImage