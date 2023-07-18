module.exports = function(req, res, next){

    // Get the file that was set to our field named "image"
    const {image} = req.files;

    // If no image submitted, exit
    if (!image) return res.status(400).send('Image is empty.');

    // If does not have image mime type prevent from uploading
    if (!image.mimetype.startsWith("image/")) return res.status(400).send('File is not an image');

    // Check if the image size is less than 2 MB (2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024;
    if (image.size > maxSize) {
      return res.status(400).send('Image size exceeds the allowed limit (2 MB).');
    }

    next();
}