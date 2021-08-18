import express from 'express';
import { GetUserDetails } from '../controllers/user.controller';
const router = express.Router();

router.post('/', GetUserDetails);
export { router as userRouter };
