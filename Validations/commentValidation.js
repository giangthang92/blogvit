const joi = require('@hapi/joi');

joi.objectId = require('joi-objectid')(joi);

const commentSchema = joi.object({
  content: joi.string().max(200).required(),
});

module.exports = commentSchema;
