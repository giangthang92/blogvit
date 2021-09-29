const express = require('express');

const router = express.Router();

const { createComment, replyComment } = require('./controller');

const { checkLogin } = require('../../midleware/midleware');

// Reply Commnet
router.post('/replyComment/:id', checkLogin, replyComment);

// Commnet Post
router.post('/:id/comment', checkLogin, createComment);

// router.post('/:id/comment', createComment);

module.exports = router;
