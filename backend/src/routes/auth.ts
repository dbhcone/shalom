import express from 'express';
import {
    Signup,
    UsersList,
    MembersList,
    Login,
    DeleteUser,
    UpdateMember,
    MembersStats,
} from '../controllers/auth.controller';
const router = express.Router();

router.post('/signup', Signup);
router.post('/users', UsersList);
router.post('/members', MembersList);
router.post('/login', Login);
router.post('/deleteUser', DeleteUser);
router.post('/updateMember', UpdateMember);
router.get('/membersstats', MembersStats);
export { router as authRouter };
