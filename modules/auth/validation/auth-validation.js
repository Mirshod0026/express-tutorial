const Joi = require('joi');

module.exports = {
  loginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
  }),
};
