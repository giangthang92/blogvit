const checkRole = async (req, res, next) => {
  if ((req.session.user.role === 'writer' || req.session.user.role === 'admin')) {
    return next();
  }
  res.json({
    status: 401,
    message: false,
  });
};

module.exports = checkRole;
