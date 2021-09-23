const { Comment } = require('../../models/Index');

module.exports = {
  createComment: async (req, res) => {
    const userId = req.session.user._id;
    const postId = req.params.id;
    const { content } = req.body;
    const comment = new Comment({
      userId,
      postId,
      content,
    });
    await comment.save();
    res.redirect('back');
  },
};
