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
  username: Joi.string().required().min(8),
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
  email: Joi.string().email(),
  surname: Joi.string().required().min(3),
  firstName: Joi.string().required().min(3),
  otherNames: Joi.string().allow(null),
  gender: Joi.string().required().length(1),
  primaryMobileNumber: Joi.string().required().min(10).max(15).messages({
    'string.base': `'primary mobile number' should be a type of 'text'`,
    'string.empty': `'primary mobile number' cannot be an empty field`,
    // 'string.length': `'primary mobile number' should have a length of {#limit}`,
    'any.required': `'primary mobile number' is a required field`,
  }),
  occupation: Joi.string().min(5).allow(null),
});


const accountUpdateValidation = Joi.object({
  _id: Joi.string().required().label("Account Id"),
  updateData: Joi.object({
    email: Joi.string().email(),
    surname: Joi.string().min(3),
    firstName: Joi.string().min(3),
    otherNames: Joi.string().allow(null),
    gender: Joi.string().length(1),
    primaryMobileNumber: Joi.string().min(10).max(15).messages({
      'string.base': `'primary mobile number' should be a type of 'text'`,
      'string.empty': `'primary mobile number' cannot be an empty field`,
    }),
    occupation: Joi.string().min(5).allow(null),
  }).required()
});
export { loginValidation, userValidation, accountValidation, accountUpdateValidation };
