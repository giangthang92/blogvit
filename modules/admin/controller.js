const { User, Post } = require('../../models/Index');

module.exports = {

  // render admin GET '/admin'
  renderAdmin: async (req, res) => {
    const userInfor = req.session.user._id;
    const user = await User.findById(userInfor);
    const post = await Post.find({ userId: userInfor });
    res.render('./admin/page/admin.ejs', { admin: user, posts: post });
  },

  // render userList GET "/admin/userList"
  userList: async (req, res) => {
    const user = await User.find().populate('posts');
    res.render('./admin/page/userList', { admin: user });
  },

  // edit user by admin PUT "/admin/editUser/:id"
  updateUser: async (req, res, next) => {
    const { id } = req.params;
    if (!req.file) {
      try {
        await User.updateOne({ _id: id }, {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
          },
        });
        return res.redirect('admin/userList');
      } catch (error) {
        next(error);
      }
    } else {
      try {
        await User.updateOne({ _id: id }, {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            avatar: req.file.filename,
            role: req.body.role,
          },
        });
        return res.redirect('admin/userList');
      } catch (error) {
        next(error);
      }
    }
  },

  // render page edit user GET "/admin/editUser/:id"
  renderUpdateUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('./admin/page/editUser.ejs', { admin: user });
  },

  // render Post and pagination GET "/admin/posts/:page"
  getPosts: async (req, res, next) => {
    try {
      const page = parseInt(req.params.page, 10) || 1;
      const pageSize = 5;
      const skipPost = (page - 1) * pageSize;
      const getPosts = Post.find({}).populate('userId').skip(skipPost).limit(pageSize);
      const getCountHiddenPost = Post.countDocumentsDeleted();
      const getCountPost = Post.countDocuments();

      const [posts, countHiddenPosts, countPosts] = await Promise.all([
        getPosts, getCountHiddenPost, getCountPost,
      ]);

      res.render('admin/page/adminPostList.ejs', {
        posts, countHiddenPosts, countPosts, page, pages: Math.ceil(countPosts / pageSize),
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
      res.render('./admin/page/hiddenPosts.ejs', { post: hiddenPost, countPost });
    } catch (error) {
      next(error);
    }
  },

  // hidden post DELETE "/admin/posts/:id"
  hiddenPost: async (req, res, next) => {
    const userDelete = req.session.user.username;
    try {
      const { id } = req.params;
      await Post.delete({ _id: id }, userDelete);
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },

  // delete post DELETE "/admin/hiddenPost/:id"
  forceDelete: async (req, res, next) => {
    const { id } = req.params;
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
          await Post.delete({ _id: { $in: req.body.postIds } });
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
