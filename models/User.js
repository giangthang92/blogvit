const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      require: true,
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    phone: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: 'avatar.jpg',
    },
    role: {
      type: String,
      enum: ['admin', 'writer', 'viewer'],
      default: 'viewer',
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Get posts with userId
userSchema.virtual('posts', {
  ref: 'posts',
  foreignField: 'userId',
  localField: '_id',
});

// hash and comparePassword
// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});
userSchema.methods.comparePassword = function comparePassword(
  candidatePassword
) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model('users', userSchema);
