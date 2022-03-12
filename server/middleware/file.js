const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filePath = Date.now() + `${ext}`;
    cb(null, filePath);
  }
});

const upload = multer({storage: fileStorage});

module.exports = upload;
