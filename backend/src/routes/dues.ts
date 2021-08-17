import express from 'express';
import { AllPayments, DeletePayment, MakePayment } from '../controllers/payment.controller';

const router = express.Router();

router.post('/all', AllPayments);

router.post('/add', MakePayment); 

router.post('/delete', DeletePayment);

export { router as duesRouter };
