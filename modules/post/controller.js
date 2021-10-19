const { isValidObjectId } = require('mongoose');

const { Post } = require('../../models/Index');

module.exports = {
  createPost: async (req, res, next) => {
    const { user } = req.session;

    const { title, description, content } = req.body;

    let post;
    try {
      if (req.file) {
        post = new Post({
          title,
          description,
          content,
          image: req.file.filename,
          userId: user._id,
        });
      } else {
        post = new Post({
          title,
          description,
          content,
          image: 'avatar.jpg',
          userId: user._id,
        });
      }

      await post.save();

      res.redirect('/user/profile');
    } catch (error) {
      next(error);
    }
  },

  renderCreate: (req, res, next) => {
    try {
      res.render('admin/page/createPost.ejs');
    } catch (error) {
      next(error);
    }
  },

  updatePost: async (req, res, next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.rener('500');
      return;
    }

    if (!isValidObjectId(id)) {
      res.render('404');
      return;
    }

    const post = await Post.findById(id);

    if (!post) {
      res.render('404');
      return;
    }

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
  renderUpdate: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        res.render('500');
        return;
      }

      const post = await Post.findById(id).lean();

      if (!post) {
        res.render('404');
        return;
      }

      res.render('admin/page/editPost', { post });
    } catch (error) {
      next(error);
    }
  },

  deletePost: async (req, res, next) => {
    const userDelete = req.session.user.username;

    try {
      const { id } = req.params;

      const post = await Post.findById(id);

      if (!post) {
        res.render('404');
      }

      await Post.delete({ _id: id }, userDelete);

      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },
};
