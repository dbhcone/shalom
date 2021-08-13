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

        if (due) {
            console.log('Payment made successfully', due);
            res.status(201).json({
              message: 'Dues paid successfully',
              code: 201,
              status: 'ok',
            });
          } else {
            res.status(400).json({
              message: 'Could not key data in for dues',
              code: 400,
              status: 'error',
            });
          }
    } catch (error) {
        return res.status(404).json({code: 404, message: error.message, status: "ok"})
    }
    
}

export {MakePayment}