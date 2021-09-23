const checkLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  const err = new Error('You must be logged in to view this page.');
  err.status = 401;
  res.redirect('/user/login');
};

module.exports = checkLogin;
