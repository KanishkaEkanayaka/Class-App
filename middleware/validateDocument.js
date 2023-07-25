module.exports = function(req, res, next){

    // Get the file that was set to our field named "image"
    const {pdfdoc} = req.files;

    // If no image submitted, exit
    if (!pdfdoc) return res.status(400).send('Pdf is empty.');

    // If does not have PDF mime type prevent from uploading
    if (!pdfdoc.mimetype.startsWith("application/pdf")) {
        return res.status(400).send('File is not a PDF.');
    }

    // Check if the image size is less than 2 MB (2 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;
    if (pdfdoc.size > maxSize) {
      return res.status(400).send('PDF size exceeds the allowed limit (2 MB).');
    }

    next();
}
