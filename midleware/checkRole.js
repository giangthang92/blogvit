const checkRole = async (req, res, next) => {
  if ((req.session.user.role === 'writer' || req.session.user.role === 'admin')) {
    return next();
  }
  return res.redirect('/user/login');
};

module.exports = checkRole;
