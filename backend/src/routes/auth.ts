import express from 'express';
import {
  Signup,
  UsersList,
  MembersList,
  Login,
} from '../controllers/auth.controller';
let router = express.Router();

router.post('/signup', Signup);
router.post('/users', UsersList);
router.post('/members', MembersList);
router.post('/login', Login);
export { router as authRouter };
