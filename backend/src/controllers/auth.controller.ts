import { Request, Response } from 'express';
import { generateToken } from '../helpers/functions/auth.helpers';
import { IAccount } from '../interfaces/account.interface';
import { IUser } from '../interfaces/user.interface';

import Account from '../models/account.model';
import Users from '../models/user.model';

// import validations
import {
    userValidation,
    loginValidation,
    accountValidation,
    accountUpdateValidation,
} from '../validators/auth.validations';

const Signup = async (req: Request, res: Response) => {
    let user: IUser, account: IAccount;
    const data = req.body;

    if (!data.account) {
        return res.status(404).json({ error: 'account object required in body' });
    }

    if (!data.user) {
        return res.status(404).json({ error: 'user object required in body' });
    }

    user = <IUser>data.user;
    account = <IAccount>data.account;

    /**
     * Validate request body [account, user]
     * - account first
     * - followed by user
     */
    //
    try {
        let validation = await accountValidation.validateAsync(account);
        console.log('Account validation completed', validation);

        try {
            let uValidation = await userValidation.validateAsync(user);
            console.log('User validation completed', uValidation);

            // now create a new account for the person
            let accountData = await new Account(account).save();

            if (accountData) {
                console.log('Account creation data', accountData);

                // now pick the _id of that account and set it to the user
                user.accountOwner = accountData._id;

                // now create a user
                let userData = await new Users(user).save();

                if (userData) {
                    console.log('User creation data', userData);
                    res.status(201).json({
                        message: 'Account created successfully',
                        code: 201,
                        status: 'ok',
                    });
                } else {
                    res.status(400).json({
                        message: 'Could not create user',
                        code: 400,
                        status: 'error',
                    });
                }
            } else {
                res.status(400).json({
                    message: 'Account creation failed',
                    code: 400,
                    status: 'error',
                });
            }
        } catch (error) {
            console.log('User Validation error', error.message);
            res.status(404).send({ code: 404, status: 'error', message: error.message });
        }
    } catch (error) {
        console.log('Account Validation error', error.message);
        res.status(404).send({ code: 404, status: 'error', message: error.message });
    }
};

const Login = async (req: Request, res: Response) => {
    let { username, password, isAdmin } = req.body;

    try {
        const validation = await loginValidation.validateAsync(req.body);
        console.log('body', req.body);

        const role = isAdmin ? 'admin' : 'member';
        const user = await Users.findOne({ username, password, role });

        // console.log('user', user);

        if (!user) {
            return res.status(403).json({ code: 403, message: 'Invalid credentials', status: 'error' });
        }

        let token = generateToken({ username: user.username, role: user.role, id: user._id }, '24h');

        return res.status(200).json({ message: 'Login successful!', token, code: 200, status: 'ok' });
    } catch (error) {
        console.log('logging in', error.message);
        return res.status(404).send({ code: 404, status: 'error', message: error.message });
    }
};

const UsersList = async (req: Request, res: Response) => {
    try {
        let data = await Users.find({});
        return res.status(200).json({ message: '', status: 'ok', code: 200, data });
    } catch (error) {
        console.log('Error fetching users', error.message);
        return res.status(404).send({
            status: 'error',
            message: 'Error fetching user details',
            code: 404,
        });
    }
};

const MembersList = async (req: Request, res: Response) => {
    try {
        let data = await Users.find({}).populate('accountOwner');
        return res.status(200).json({
            code: 200,
            message: 'Members list fetched successfully',
            status: 'ok',
            data,
        });
    } catch (error) {
        console.log('Error fetching members list', error.message);
        return res.status(404).json({ code: 404, message: error.message, status: 'error' });
    }
};

const DeleteUser = async (req: Request, res: Response) => {
    // this is not going to set a status flag, it is actually going to perform a delete
    const { _id } = req.body;
    if (!_id) {
        return res.status(404).json({ message: 'User id is required', status: 'error', code: 404 });
    }
    /**
     * Use the _id received to delete from accounts
     * Use that _id to pick the document with owner from users
     * then delete
     */
    try {
        const account = await Account.findByIdAndDelete(_id);
        if (account) {
            // we were able to remove that account (member details)
            const user = await Users.findOne({ accountOwner: _id });

            console.log('user delete?', user);
            if (!user) {
                return res
                    .status(404)
                    .json({ status: 'error', message: 'User does not exist. Delete failed.', code: 404 });
            }
            return res
                .status(200)
                .json({ status: 'ok', message: 'User account deleted successfully', code: 200, data: user });
        } else {
            return res.status(404).json({ code: 404, status: 'error', message: 'User account does not exist' });
        }
    } catch (error) {
        return res.status(404).json({ status: 'error', message: error.message, code: 404 });
    }
};

const UpdateMember = async (req: Request, res: Response) => {
    const data = req.body;

    try {
        const { _id, updateData } = data;

        const validation = await accountUpdateValidation.validateAsync(data);
        console.log('Validation', validation);

        const account = await Account.findByIdAndUpdate(_id, { $set: updateData }, { new: true });
        console.log('account', account);

        if (account) {
            return res.status(200).json({ data: account, message: 'Account details updated successfully!', code: 200 });
        } else {
            return res.status(404).json({ error: { message: 'Could not find account to be updated' }, code: 404 });
        }
    } catch (error) {
        return res.status(404).json({ message: error.message, code: 404, status: 'error' });
    }
};
export { Signup, Login, UsersList, MembersList, DeleteUser, UpdateMember };
