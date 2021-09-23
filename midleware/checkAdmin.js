const checkAmdin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  const err = new Error('You must be logged in to view this page.');
  err.status = 401;
  res.redirect('/user/login');
};

module.exports = checkAmdin;
