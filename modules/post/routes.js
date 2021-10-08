const express = require('express');

const router = express.Router();

const {
  checkLogin,
  checkPermissionPost,
  checkRole,
  upload,
} = require('../../midleware/midleware');

const {
  createPost,
  updatePost,
  renderUpdate,
  renderCreate,
  deletePost,
} = require('./controller');

const { validatePost } = require('../../midleware/validate');

router.get('/create', checkLogin, checkRole, renderCreate);

router.get('/edit/:id', checkLogin, checkPermissionPost, renderUpdate);

// upload aws s3 ???
router.post(
  '/create',
  checkLogin,
  checkRole,
  upload.single('image'),
  validatePost,
  createPost
);

router.put(
  '/edit/:id',
  checkLogin,
  checkRole,
  checkPermissionPost,
  upload.single('image'),
  validatePost,
  updatePost
);

router.delete('/:id', checkLogin, checkPermissionPost, deletePost);

module.exports = router;
