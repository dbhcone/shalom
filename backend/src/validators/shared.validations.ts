import Joi, { ObjectSchema } from 'joi';

const mongoidValidation: ObjectSchema<{ _id: string }> = Joi.object({
    _id: Joi.string().required(),
});

export { mongoidValidation };
