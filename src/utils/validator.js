import Joi from '@hapi/joi';
import expressJoiValidation from 'express-joi-validation';

export const validator = expressJoiValidation.createValidator({});

export const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('[a-zA-Z]{1,}[0-9]{1,}')).required(),
  age: Joi.number().min(4).max(130).required()
});

export const groupSchema = Joi.object({
  name: Joi.string().required(),
  permission: Joi.array().items(Joi.string()).required()
});
