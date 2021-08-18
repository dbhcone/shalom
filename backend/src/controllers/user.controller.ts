import { Request, Response } from 'express';
import Account from '../models/account.model';
import { mongoidValidation } from '../validators/shared.validations';

const GetUserDetails = async (req: Request, res: Response) => {
    const data = req.body;

    try {
        const validation = await mongoidValidation.validateAsync(data);

        const useraccount = await Account.findById(data._id);

        if (!useraccount) {
            return res.status(404).json({ error: 'User does not exist', code: 404, status: 'error' });
        }

        /**
         * TODO: return user data except password
         */

        return res.status(200).json({ status: 'ok', message: 'User data fetched successfully', data: useraccount });
    } catch (error) {
        return res.status(404).json({ error: error.message, code: 404, status: 'error' });
    }
};

export { GetUserDetails };
