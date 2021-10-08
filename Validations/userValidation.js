const joi = require('@hapi/joi');

const enumRole = ['admin', 'writer', 'viewer'];

const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userSchema = joi.object({
  username: joi.string().min(3).max(10).required(),
  password: joi.string().min(6).max(12).required(),
  name: joi.string().max(20).required(),
  phone: joi.string().required().regex(phoneRegex),
  email: joi.string().email().required(),
  avatar: joi.string(),
  role: joi
    .string()
    .required()
    .valid(...enumRole),
});

module.exports = userSchema;
