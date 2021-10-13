const express = require('express');

const router = express.Router();

const { validatePost } = require('../../midleware/validate');

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

router.delete(
  '/:id',
  checkLogin,
  checkPermissionPost,
  validatePost,
  deletePost
);

module.exports = router;
