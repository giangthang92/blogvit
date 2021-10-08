const joi = require('@hapi/joi');

const postSchema = joi.object({
  title: joi.string().max(100).required(),
  description: joi.string().max(200).required(),
  content: joi.string().required(),
  image: joi.string(),
});

module.exports = postSchema;
