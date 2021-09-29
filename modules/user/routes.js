const express = require('express');

const { checkLogin, upload } = require('../../midleware/midleware');

const router = express.Router();
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
router.post('/register', register);
router.get('/login', formLogin);
// router.get('/profile', getUser);
router.get('/profile', renderUser);
router.post('/login', login);
router.put('/edit', checkLogin, upload.single('avatar'), updateUser);
router.get('/logout', logout);
module.exports = router;
