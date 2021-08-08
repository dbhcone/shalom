import Joi, { ObjectSchema } from 'joi';

const loginValidation: ObjectSchema<{
  username: string;
  password: string;
}> = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean(),
});

const userValidation: ObjectSchema<{
  username: string;
  password: string;
  role: string;
}> = Joi.object({
  username: Joi.string().required().min(8).trim(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

const accountValidation: ObjectSchema<{
  email: string;
  surname: string;
  firstName: string;
  otherNames?: string;
  gender: string;
  primaryMobileNumber: string;
  otherNumbers: string[];
  occupation: string;
}> = Joi.object({
  email: Joi.string().email().trim(),
  surname: Joi.string().required().min(3).trim(),
  firstName: Joi.string().required().min(3).optional(),
  otherNames: Joi.string().label('other names'),
  gender: Joi.string().required().trim().min(4).max(6),
  primaryMobileNumber: Joi.string().required().trim().length(10).messages({
    'string.base': `'primary mobile number' should be a type of 'text'`,
    'string.empty': `'primary mobile number' cannot be an empty field`,
    'string.length': `'primary mobile number' should have a length of {#limit}`,
    'any.required': `'primary mobile number' is a required field`,
  }),
  occupation: Joi.string().trim().min(5),
});

export { loginValidation, userValidation, accountValidation };
