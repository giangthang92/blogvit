const express = require('express');

const router = express.Router();

const { checkLogin, checkAdmin } = require('../../midleware/midleware');

const {
  renderAdmin,
  userList,
  renderUpdateUser,
  getPosts,
  hiddenPostList,
  hiddenPost,
  restorePost,
  forceDelete,
  formActionBtnHiddenPost,
  formActionBtnPost,
} = require('./controller');

router.get('/profile', checkLogin, checkAdmin, renderAdmin);
router.get('/userList', checkLogin, checkAdmin, userList);
router.get('/editUser/:id', checkLogin, checkAdmin, renderUpdateUser);
router.post('/posts/actionList', checkLogin, checkAdmin, formActionBtnPost);
router.get('/hiddenPost', checkLogin, checkAdmin, hiddenPostList);
router.post(
  '/hiddenPost/actionList',
  checkLogin,
  checkAdmin,
  formActionBtnHiddenPost
);
router.post('/hiddenPost/:id', checkLogin, checkAdmin, restorePost);
router.delete('/posts/:id', checkLogin, checkAdmin, hiddenPost);
router.delete('/hiddenPost/:id', checkLogin, checkAdmin, forceDelete);
router.get('/posts/:page', checkAdmin, getPosts);

module.exports = router;
