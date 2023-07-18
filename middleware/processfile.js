const util = require("util");
const Multer = require("multer");
const maxSize = 10 * 1024 * 1024;

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");

let processFileMiddleware = util.promisify(processFile);

// Custom middleware to check file size
function checkFileSize(req, res, next) {
  if (req.file && req.file.size > maxSize) {
    return res.status(400).json({ error: "File size exceeds the allowed limit" });
  }
  next();
}

module.exports = {processFileMiddleware, checkFileSize};
