import { Request, Response } from "express";
import { IDues } from "../interfaces/dues.interface";
import { duesSchema } from "../validators/payment.validations";
import Dues from '../models/dues.model';

const MakePayment = async(req: Request, res: Response) => {
    const data : IDues = req.body;

    try {
        let validation = await duesSchema.validateAsync(data);
        console.log("Validating dues completed", validation);
        
        let due = await new Dues(data).save();
    } catch (error) {
        
    }
    
}

export {MakePayment}