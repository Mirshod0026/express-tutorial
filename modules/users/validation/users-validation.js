const Joi = require('joi');

module.exports = {
  createUserSchema: Joi.object().keys({
    username: Joi.string().min(6).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
    role: Joi.string().optional(),
  }),
};
