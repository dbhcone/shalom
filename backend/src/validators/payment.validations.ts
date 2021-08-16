import Joi, { ObjectSchema } from "joi";
import { IAccount } from "../interfaces/account.interface";
import { IUser } from "../interfaces/user.interface";

const duesSchema: ObjectSchema<{
    amount: number;
    recordedBy: IUser["_id"];
    payer: IAccount["_id"];
    year: number;
    month: string;
    date: Date;
}> = Joi.object({
    amount: Joi.number().required().greater(0),
    recordedBy: Joi.any().required().label("recorded by"),
    payer: Joi.any().required(),
    year: Joi.number().greater(2010),
    month: Joi.string().required(),
    date: Joi.date().required()
})

export {duesSchema}