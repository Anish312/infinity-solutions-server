const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Set up storage engine

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Allowed video MIME types
const allowedMimeTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];

const fileFilter = (req, file, cb) => {
  const extname = /\.(mp4|mov|avi|mkv)$/i.test(path.extname(file.originalname));
  const mimetype = allowedMimeTypes.includes(file.mimetype);

  if (mimetype && extname) {
      return cb(null, true);
  } else {
      cb(new Error('Only .mp4, .mov, .avi, and .mkv files are allowed'));
  }
};

// Initialize multer for video upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // Limit to 100MB
});
module.exports = upload;
