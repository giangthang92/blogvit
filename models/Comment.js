const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    require: true,
    trim: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'posts',
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'comments',
  },
  replyComments: {
    type: Array,
    ref: 'comments',
  },
});

module.exports = mongoose.model('comments', commentSchema);
