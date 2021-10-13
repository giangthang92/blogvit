const joi = require('@hapi/joi');

joi.objectId = require('joi-objectid')(joi);

const commentSchema = joi.object({
  content: joi.string().max(200).required(),
  parentId: joi.objectId(),
});

module.exports = commentSchema;
