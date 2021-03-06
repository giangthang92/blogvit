const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongooseDelete = require('mongoose-delete');

const postSchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  content: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: 'avatar.jpg',
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'users',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Plugin mongoose-delete to hidden posts
postSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});

module.exports = mongoose.model('posts', postSchema);
