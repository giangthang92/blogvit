const commentSchema = require('../Validations/commentValidation');

const userSchema = require('../Validations/userValidation');

const postSchema = require('../Validations/postValidation');

module.exports = {
  validateUser: (req, res, next) => {
    const valid = userSchema.validate(req.body);

    if (!valid.error) {
      return next();
    }
    res.render('500');
  },

  validateComment: (req, res, next) => {
    const valid = commentSchema.validate(req.body);

    if (!valid.error) {
      return next();
    }
    res.render('500');
  },

  validatePost: (req, res, next) => {
    const valid = postSchema.validate(req.body);

    if (!valid.error) {
      return next();
    }
    res.render('500');
  },
};
