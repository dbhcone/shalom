import { Request, Response } from 'express';
import { IDues } from '../interfaces/dues.interface';
import { duesSchema } from '../validators/payment.validations';
import Dues from '../models/dues.model';
import { mongoidValidation } from '../validators/shared.validations';

const MakePayment = async (req: Request, res: Response) => {
    const data: IDues = req.body;

    try {
        const validation = await duesSchema.validateAsync(data);
        console.log('Validating dues completed', validation);

        /**
         * First check if there is a payment by this member for the same:
         * - payer
         * - year
         * - month
         */
        const { payer, year, month } = data;
        const findDues = await Dues.find({ payer, year, month });
        if (findDues.length > 0) {
            // there is already a payment for this same payer, year and month
            return res
                .status(409)
                .json({ status: 'error', message: 'Payment has already been made for this year and month', code: 409 });
        }
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
        return res.status(404).json({ code: 404, message: error.message, status: 'error' });
    }
};

const AllPayments = async (req: Request, res: Response) => {
    try {
        let data = await Dues.find({}).populate('payer');
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
        const validation = await mongoidValidation.validateAsync(data);

        const due = await Dues.findByIdAndDelete(data._id);

        if (due) {
            return res.status(200).json({ message: 'Payment deleted successfully', code: 200, status: 'ok' });
        }
        return res.status(404).json({ status: 'error', message: 'Could not find and delete payment', code: 404 });
    } catch (error) {
        return res.status(404).json({ status: 'error', message: error.message, code: 404 });
    }
};

const PaymentsStats = async (req: Request, res: Response) => {
    try {
        const currentYear = new Date().getFullYear();
        console.log('year', currentYear);
        const payments = await Dues.aggregate([
            // matching only the current year
            { $match: { year: currentYear } },

            // group based on the month
            {
                $group: {
                    _id: '$month',
                    amount: { $sum: '$amount' },
                    count: { $sum: 1 },
                },
            },
        ]);
        return res.status(200).json({
            message: 'Data fetched successfully',
            status: 'ok',
            code: 200,
            data: { year: currentYear, payments },
        });
    } catch (error) {
        return res.status(404).json({ message: error.message, status: 'error', code: 404 });
    }
};
export { MakePayment, AllPayments, DeletePayment, PaymentsStats };
