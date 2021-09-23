const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/upload');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if ((file.mimetype === 'image/bmp'
        || file.mimetype === 'image/png'
        || file.mimetype === 'image/jpeg')) {
      cb(null, true);
    } else {
      return cb(new Error('Only image are allowed!'));
    }
  },
});

module.exports = upload;
