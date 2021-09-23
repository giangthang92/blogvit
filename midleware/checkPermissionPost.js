const Post = require('../models/Post');

const checkPermissionPost = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if ((req.session.user._id === post.userId.toString()) || req.session.user.role === 'manager') {
    return next();
  }
  res.json({
    status: 401,
    message: false,
  });
};

module.exports = checkPermissionPost;
