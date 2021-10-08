const joi = require('@hapi/joi');

const postSchema = yup.object({
  title:
  description:
  content:
  image:
  userId:
  createdAt:

});

module.exports = postSchema;