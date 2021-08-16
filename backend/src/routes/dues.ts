import express from 'express';
import { AllPayments, MakePayment } from '../controllers/payment.controller';

const router = express.Router();

router.post('/all', AllPayments);

router.post('/add', MakePayment); 

export { router as duesRouter };
