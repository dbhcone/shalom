import { Request, Response } from 'express';
import { IDues } from '../interfaces/dues.interface';
import { duesSchema } from '../validators/payment.validations';
import Dues from '../models/dues.model';
import { deleteByIdValidation } from '../validators/shared.validations';

const MakePayment = async (req: Request, res: Response) => {
  const data: IDues = req.body;

  try {
    const validation = await duesSchema.validateAsync(data);
    console.log('Validating dues completed', validation);

    const due = await new Dues(data).save();

    if (due) {
      console.log('Payment made successfully', due);
      return res.status(201).json({
        message: 'Dues paid successfully',
        code: 201,
        status: 'ok',
      });
    } else {
      return res.status(400).json({
        message: 'Could not key data in for dues',
        code: 400,
        status: 'error',
      });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ code: 404, message: error.message, status: 'error' });
  }
};

const AllPayments = async (req: Request, res: Response) => {
  try {
    let data = await Dues.find({}).populate("payer");
    res.status(200).json({ message: 'Fetching all dues successfull', status: 'ok', code: 200, data });
  } catch (error) {
    console.log('Error fetching all payments', error.message);
    res.status(404).send({
      status: 'error',
      message: 'Error fetching payments details',
      description: `${error.message}`,
      code: 404,
    });
  }
};

const DeletePayment = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const validation = await deleteByIdValidation.validateAsync(data);

    const due = await Dues.findByIdAndDelete(data._id);

    if (due) {
      return res.status(200).json({message: "Payment deleted successfully", code: 200, status: 'ok'})
    }
    return res.status(404).json({status: 'error', message: "Could not find and delete payment", code: 404})
  } catch (error) {
    return res.status(404).json({status: 'error', message: error.message, code: 404})
  }
}

export { MakePayment, AllPayments, DeletePayment };
