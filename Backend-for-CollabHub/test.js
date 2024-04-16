//CLOUDINARY_URL=cloudinary://642967421143458:fC4IH5QuWokrwJYYgXIQAI5Uhy8@dkhazpxpb
// Require the cloudinary library
const cloudinary = require('cloudinary').v2;
require("dotenv").config()
// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name : "dkhazpxpb",
    api_key : "642967421143458",
    api_secret : "fC4IH5QuWokrwJYYgXIQAI5Uhy8",
    secure: true
});

// Log the configuration
console.log(cloudinary.config());


/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};
    

/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};
   

//////////////////////////////////////////////////////////////
// Creates an HTML image tag with a transformation that
// results in a circular thumbnail crop of the image  
// focused on the faces, applying an outline of the  
// first color, and setting a background of the second color.
//////////////////////////////////////////////////////////////

   

//////////////////
//
// Main function
//
//////////////////
(async () => {

    // Set the image to upload
    const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';

    // Upload the image
    const publicId = await uploadImage(imagePath);
    console.log(publicId)
    // Get the colors in the image
    const colors = await getAssetInfo(publicId);
    console.log(colors)

    // Create an image tag, using two of the colors in a transformation
    //const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

    // Log the image tag to the console
    //console.log(imageTag);

})();
