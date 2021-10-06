const express = require('express');

const {
  checkLogin,
  checkPermissionPost,
  checkRole,
  upload,
} = require('../../midleware/midleware');

const router = express.Router();

const {
  createPost,
  updatePost,
  renderUpdate,
  renderCreate,
  deletePost,
} = require('./controller');

// joi yup check form ???
router.get('/create', checkLogin, checkRole, renderCreate);

router.get('/edit/:id', checkLogin, checkPermissionPost, renderUpdate);

// upload aws s3 ???
router.post('/create', checkLogin, checkRole, upload.single('image'), createPost);

router.put('/edit/:id', checkLogin, checkRole, checkPermissionPost, upload.single('image'), updatePost);

router.delete('/:id', checkLogin, checkPermissionPost, deletePost);

module.exports = router;
