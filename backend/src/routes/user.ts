import express from 'express';
import { GetUserDetails, UploadProfilePhoto } from '../controllers/user.controller';
import { profilePhoto } from '../validators/shared.validations';
const router = express.Router();

router.post('/', GetUserDetails);
router.post('/upload-photo', profilePhoto.single('photo'), UploadProfilePhoto);
export { router as userRouter };
