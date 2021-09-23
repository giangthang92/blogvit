// eslint-disable-next-line import/extensions
const { User, Post } = require('../../models/Index.js');

module.exports = {
  register: async (req, res) => {
    const {
      username, password, name, phone, email,
    } = req.body;
    if (!username || !password || !phone || !name || !email) {
      return res.status(400).json({
        success: false,
        message: 'You need complete form',
      });
    }
    try {
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({
          success: false,
          message: 'Username already exist',
        });
      }
      const newUser = new User({
        username, password, name, phone, email,
      });
      await newUser.save();
      return res.redirect('/user/login');
    } catch (error) {
      return res.status(401);
    }
  },

  formRegister: (req, res) => {
    res.render('register.ejs');
  },

  formLogin: (req, res) => {
    res.render('./admin/page/login.ejs');
  },

  login: async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username or password missing',
      });
    }
    try {
      const user = await User.findOne({ username });
      const checkPassword = user.comparePassword(password);
      if (!user || !checkPassword) {
        return res.status(400).json({
          success: false,
          message: 'User or password wrong',
        });
      }
      req.session.user = user;
      res.redirect('/user/profile');
    } catch (error) {
      next(error);
    }
  },

  renderUser: async (req, res) => {
    const userInfor = req.session.user._id;
    const { role } = req.session.user;
    const user = await User.findById(userInfor);
    const post = await Post.find({ userId: userInfor });
    if (role === 'admin') {
      res.redirect('/admin/profile');
    } else {
      res.render('admin/page/writer.ejs', { admin: user, posts: post });
    }
  },

  updateUser: async (req, res, next) => {
    const userId = req.session.user._id;
    if (!req.file) {
      try {
        await User.updateOne({ _id: userId }, {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
          },
        });
        return res.redirect('profile');
      } catch (error) {
        next(error);
      }
    } else {
      try {
        await User.updateOne({ _id: userId }, {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            avatar: req.file.filename,
          },
        });
        return res.redirect('profile');
      } catch (error) {
        next(error);
      }
    }
  },
  getUsers: async (req, res, next) => {
    try {
      await User.find().lean();
      res.redirect('/userList');
    } catch (error) {
      next(error);
    }
  },
  getUser: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id).lean();
      if (!user) {
        res.redirect('/user/profile');
      } else {
        res.json({
          success: false,
          status: 404,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
