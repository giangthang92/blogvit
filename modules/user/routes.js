const express = require('express');

const router = express.Router();

const { checkLogin, upload } = require('../../midleware/midleware');

const { validateUser } = require('../../midleware/validate');

const {
  register,
  formRegister,
  formLogin,
  login,
  updateUser,
  renderUser,
  // getUser,
  logout,
} = require('./controller');

router.get('/register', formRegister);
router.post('/register', validateUser, register);
router.get('/login', formLogin);
// router.get('/profile', getUser);
router.get('/profile', renderUser);
router.post('/login', validateUser, login);
router.put(
  '/edit',
  checkLogin,
  upload.single('avatar'),
  validateUser,
  updateUser
);
router.get('/logout', logout);
module.exports = router;
