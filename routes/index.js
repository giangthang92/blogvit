const express = require('express');

const { Post, Comment } = require('../models/Index');

const router = express.Router();

router.get('/post/:id', async (req, res, next) => {
  try {
    const { user } = req.session;
    const { id } = req.params;
    const post = await Post.findOne({ _id: id }).populate('userId');
    const comment = await Comment.find({ postId: id }).populate('userId');
    if (!post) {
      res.json({ status: 400, message: 'error' });
      return;
    }
    res.render('client/page/post.ejs', { post, comment, user });
  } catch (error) {
    next(error);
  }
});

router.get('/index/:page', async (req, res, next) => {
  try {
    const page = parseInt(req.params.page, 10) || 1;
    const pageSize = 5;
    const skipPost = (page - 1) * pageSize;
    const post = await Post.find({}).populate('userId').skip(skipPost).limit(pageSize);
    const countHiddenPost = await Post.countDocumentsDeleted();
    const countPost = await Post.countDocuments();
    res.render('client/page/index.ejs', {
      post, countHiddenPost, countPost, page, pages: Math.ceil(countPost / pageSize),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
