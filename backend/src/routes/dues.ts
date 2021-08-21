import express from 'express';
import { AllPayments, DeletePayment, MakePayment, PaymentsStats } from '../controllers/payment.controller';

const router = express.Router();

router.post('/all', AllPayments);

router.post('/add', MakePayment);

router.post('/delete', DeletePayment);

router.get('/paymentsstats', PaymentsStats);

export { router as duesRouter };
