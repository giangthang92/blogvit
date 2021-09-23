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

router.get('/create', checkLogin, renderCreate);

router.get('/edit/:id', checkLogin, checkPermissionPost, renderUpdate);

router.post('/create', checkLogin, checkRole, upload.single('image'), createPost);

router.put('/edit/:id', checkLogin, checkRole, checkPermissionPost, upload.single('image'), updatePost);

router.delete('/:id', checkLogin, checkPermissionPost, deletePost);

module.exports = router;
