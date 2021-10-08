const { Post } = require('../../models/Index');

module.exports = {
  createPost: async (req, res, next) => {
    const { user } = req.session;

    const { title, description, content } = req.body;

    try {
      const post = new Post({
        title,
        description,
        content,
        image: req.file.filename || null,
        userId: user._id,
      });
      await post.save();
      res.redirect('/user/profile');
    } catch (error) {
      next(error);
    }
  },
  renderCreate: (req, res) => {
    res.render('admin/page/createPost.ejs');
  },

  updatePost: async (req, res, next) => {
    const { id } = req.params;

    try {
      if (req.file) {
        await Post.updateOne(
          { _id: id },
          {
            $set: {
              title: req.body.title,
              description: req.body.description,
              content: req.body.content,
              image: req.file.filename,
            },
          }
        );
        res.redirect('/user/profile');
        return;
      }

      await Post.updateOne(
        { _id: id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
          },
        }
      );

      res.redirect('/user/profile');
    } catch (error) {
      next(error);
    }
  },

  getPosts: async (req, res) => {
    try {
      const post = await Post.find().lean();
      res.json({ post });
    } catch (error) {
      res.json({
        success: false,
        message: error,
      });
    }
  },

  // kiem tra du lieu id try catch
  // kiem tra post
  renderUpdate: async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).lean();
    res.render('admin/page/editPost', { post });
  },

  deletePost: async (req, res, next) => {
    const userDelete = req.session.user.username;
    try {
      const { id } = req.params;
      await Post.delete({ _id: id }, userDelete);
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },
};
