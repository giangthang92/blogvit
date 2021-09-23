const express = require('express');

const router = express.Router();

const { createComment } = require('./controller');

router.post('/:id/comment', createComment);

module.exports = router;
