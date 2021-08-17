import Joi, { ObjectSchema } from 'joi';

const deleteByIdValidation: ObjectSchema<{ _id: string }> = Joi.object({
    _id: Joi.string().required(),
});

export { deleteByIdValidation };
