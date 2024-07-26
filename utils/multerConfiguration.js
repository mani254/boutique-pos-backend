const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/');
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
   fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
         cb(null, true);
      } else {
         cb(new Error('Only images are allowed!'), false);
      }
   }
});

module.exports = upload
