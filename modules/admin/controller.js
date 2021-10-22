const { isValidObjectId } = require('mongoose');

const { User, Post } = require('../../models/Index');

module.exports = {
  // render admin GET '/admin'
  renderAdmin: async (req, res, next) => {
    try {
      const userInfor = req.session.user._id;

      const user = await User.findById(userInfor);

      const post = await Post.find({ userId: userInfor });

      res.render('admin/page/admin', { admin: user, posts: post });
    } catch (error) {
      next(error);
    }
  },

  // render userList GET "/admin/userList"
  userList: async (req, res, next) => {
    try {
      const user = await User.find().populate('posts');

      // res.json(user);
      res.render('admin/page/userList', { admin: user });
    } catch (error) {
      next(error);
    }
  },

  // edit user by admin PUT "/admin/editUser/:id"
  adminUpdateUser: async (req, res, next) => {
    const { id } = req.params;

    const result = isValidObjectId(id);

    if (!result) {
      res.render('404');
      return;
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
      res.render('500');
      return;
    }

    try {
      if (!req.file) {
        await User.updateOne(
          { _id: id },
          {
            $set: {
              name: req.body.name,
              role: req.body.role,
              email: req.body.email,
              phone: req.body.phone,
            },
          }
        );
      } else {
        await User.updateOne(
          { _id: id },
          {
            $set: {
              name: req.body.name,
              role: req.body.role,
              email: req.body.email,
              phone: req.body.phone,
              avatar: req.file.filename,
            },
          }
        );
      }
      res.redirect('/admin/userList');
    } catch (error) {
      next(error);
    }
  },

  // render page edit user GET "/admin/editUser/:id"
  renderUpdateUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = isValidObjectId(id);

      if (!result) {
        res.render('404');
        return;
      }

      const user = await User.findById(id);

      if (!user) {
        res.render('500');
        return;
      }

      res.render('admin/page/editUser', { admin: user });
    } catch (error) {
      next(error);
    }
  },

  // render Post and pagination GET "/admin/posts/:page"
  getPosts: async (req, res, next) => {
    try {
      const page = parseInt(req.params.page, 10) || 1;

      const pageSize = 5;

      const skipPost = (page - 1) * pageSize;

      const getPosts = Post.find({})
        .populate('userId')
        .skip(skipPost)
        .limit(pageSize);

      const getCountHiddenPost = Post.countDocumentsDeleted();

      const getCountPost = Post.countDocuments();

      const [posts, countHiddenPost, countPosts] = await Promise.all([
        getPosts,
        getCountHiddenPost,
        getCountPost,
      ]);

      res.render('admin/page/adminPostList', {
        post: posts,
        countHiddenPost,
        countPosts,
        page,
        pages: Math.ceil(countPosts / pageSize),
      });
    } catch (error) {
      next(error);
    }
  },

  // render hidden posts GET "/admin/hiddenPostList"
  hiddenPostList: async (req, res, next) => {
    try {
      const hiddenPost = await Post.findDeleted().populate('userId');
      const countPost = await Post.countDocuments();
      res.render('admin/page/hiddenPosts', {
        post: hiddenPost,
        countPost,
      });
    } catch (error) {
      next(error);
    }
  },

  // hidden post DELETE "/admin/posts/:id"
  hiddenPost: async (req, res, next) => {
    const userDelete = req.session.user.username;
    try {
      const { id } = req.params;

      const post = await Post.findById(id);

      if (!post) {
        res.render('500');
        return;
      }

      await Post.delete({ _id: id }, userDelete);
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },

  // delete post DELETE "/admin/hiddenPost/:id"
  forceDelete: async (req, res, next) => {
    const { id } = req.params;

    const post = await Post.findOneDeleted({ _id: id });

    if (!post) {
      res.render('500');
      return;
    }

    try {
      await Post.deleteOne({ _id: id });
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },

  // restore post POST "/admin/hiddenPost/:id"
  restorePost: async (req, res, next) => {
    const { id } = req.params;
    try {
      const post = await Post.findOneDeleted({ _id: id });
      if (!post) {
        res.render('500');
        return;
      }
      await Post.restore({ _id: id });
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },

  // delete & restore by btn action in page "hiddenPost"
  formActionBtnHiddenPost: async (req, res, next) => {
    switch (req.body.action) {
      case 'restore':
        try {
          await Post.restore({ _id: { $in: req.body.postIds } });
          res.redirect('back');
        } catch (error) {
          next(error);
        }
        break;
      case 'delete':
        try {
          await Post.deleteMany({ _id: { $in: req.body.postIds } });
          res.redirect('back');
        } catch (error) {
          next(error);
        }
        break;
      default:
      // do nothing
    }
  },

  // hidden more posts by btn action on page "posts"
  formActionBtnPost: async (req, res, next) => {
    switch (req.body.action) {
      case 'hidden':
        try {
          const userDelete = req.session.user.username;
          await Post.delete({ _id: { $in: req.body.postIds } }, userDelete);
          res.redirect('back');
        } catch (error) {
          next(error);
        }
        break;
      default:
      // do nothing
    }
  },
};
