const express = require('express');

const router = express.Router();

const { createComment, replyComment } = require('./controller');

const { checkLogin } = require('../../midleware/midleware');

const { validateComment } = require('../../midleware/validate');

// Reply Commnet
router.post('/replyComment/:id', checkLogin, validateComment, replyComment);

// Commnet Post
router.post('/:id/comment', checkLogin, validateComment, createComment);

// router.post('/:id/comment', createComment);

module.exports = router;
