const cloudinary = require('cloudinary').v2;
const config = require('config');

cloudinary.config({ 
    cloud_name: config.get('cloudinary.cloud-name'), 
    api_key: config.get('cloudinary.api-key'), 
    api_secret: config.get('cloudinary.api-secret'),
    secure: true
  });

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath, id) => {

    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: true,
        overwrite: true,
        folder: id
    };

    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);

    return result.public_id;
};

/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
        colors: true,
    };

    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options);

    return result.colors;
};

/////////////////////////////////////
// Gets secureurl of an uploaded image
/////////////////////////////////////
const getUrlInfo = async (publicId) => {

  // Return colors in the response
  const options = {
    colors: true,
  };

    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options);

    return result.secure_url;

};

//////////////////////////////////////////////////////////////
// Creates an HTML image tag with a transformation that
// results in a circular thumbnail crop of the image
// focused on the faces, applying an outline of the
// first color, and setting a background of the second color.
//////////////////////////////////////////////////////////////
const createImageTag = (publicId, ...colors) => {

  // Set the effect color and background color
  const [effectColor, backgroundColor] = colors;

  // Create an image tag with transformations applied to the src URL
  let imageTag = cloudinary.image(publicId, {
    transformation: [{
        width: 250,
        height: 250,
        gravity: 'faces',
        crop: 'thumb'
      },
      {
        radius: 'max'
      },
      {
        effect: 'outline:10',
        color: effectColor
      },
      {
        background: backgroundColor
      },
    ],
  });

  return imageTag;
};

module.exports.uploadImage = uploadImage;
module.exports.getAssetInfo = getAssetInfo;
module.exports.getUrlInfo = getUrlInfo;
module.exports.createImageTag = createImageTag;