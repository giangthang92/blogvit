const express = require('express');

const router = express.Router();

const { createComment, replyComment } = require('./controller');

router.post('/replyComment/:id', replyComment);
router.post('/:id/comment', createComment);

// router.post('/:id/comment', createComment);

module.exports = router;
