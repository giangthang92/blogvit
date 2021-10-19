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
  updateUser,
} = require('./controller');

router.get('/profile', checkLogin, checkAdmin, renderAdmin);

router.get('/userList', checkLogin, checkAdmin, userList);

router.get('/editUser/:id', checkLogin, checkAdmin, renderUpdateUser);

router.put('/editUser/:id', updateUser);

router.post('/posts/actionList', checkLogin, checkAdmin, formActionBtnPost);

router.patch('/hiddenPost/:id', checkLogin, checkAdmin, restorePost);

router.post(
  '/hiddenPost/actionList',
  checkLogin,
  checkAdmin,
  formActionBtnHiddenPost
);

router.delete('/posts/:id', checkLogin, checkAdmin, hiddenPost);

router.delete('/hiddenPost/:id', checkLogin, checkAdmin, forceDelete);

router.get('/hiddenPost', checkLogin, checkAdmin, hiddenPostList);

router.get('/posts/:page', checkAdmin, getPosts);

module.exports = router;
