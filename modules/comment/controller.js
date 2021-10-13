const { isValidObjectId } = require('mongoose');

const { Comment } = require('../../models/Index');

const { Post } = require('../../models/Index');

module.exports = {
  createComment: async (req, res, next) => {
    const userId = req.session.user._id;

    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      res.render('500');
      return;
    }

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

    const result = isValidObjectId(parentId);

    if (!result) {
      res.render('404');
      return;
    }

    const commentParent = await Comment.findById(parentId);

    if (!commentParent) {
      res.render('500');
      return;
    }

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
