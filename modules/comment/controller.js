const { Comment } = require('../../models/Index');

module.exports = {
  createComment: async (req, res, next) => {
    const userId = req.session.user._id;
    const postId = req.params.id;
    const { content } = req.body;
    try {
      const comment = new Comment({
        userId,
        postId,
        content,
      });
      await comment.save();
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },
  replyComment: async (req, res, next) => {
    const parentId = req.params.id;
    const userId = req.session.user._id;
    const { content } = req.body;
    try {
      const comment = new Comment({
        userId,
        parentId,
        content,
      });
      await comment.save();
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },
};
