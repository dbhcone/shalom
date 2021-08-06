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
          res
            .status(201)
            .json({
              message: 'Account created successfully',
              code: 201,
              status: 'ok',
            });
        } else {
          res
            .status(400)
            .json({
              message: 'Could not create user',
              code: 400,
              status: 'error',
            });
        }
      } else {
        res
          .status(400)
          .json({
            message: 'Account creation failed',
            code: 400,
            status: 'error',
          });
      }
    } catch (error) {
      console.log('User Validation error', error.message);
      res
        .status(404)
        .send({ code: 404, status: 'error', message: error.message });
    }
  } catch (error) {
    console.log('Account Validation error', error.message);
    res
      .status(404)
      .send({ code: 404, status: 'error', message: error.message });
  }
};

const Login = async (req: Request, res: Response) => {
  let { username, password, isAdmin } = req.body;

  try {
    // if (!username || !password) {
    //   return res
    //     .status(404)
    //     .json({ error: 'Supply the correct payload to this endpoint' });
    // }

    const validation = await loginValidation.validateAsync(req.body);
    let user: IUser | null;

    user = await Users.findOne(
      isAdmin ? { username, password } : { username, password, role: 'admin' }
    );

    console.log('user', user);

    if (!user) {
      return res
        .status(403)
        .json({ code: 403, message: 'Invalid credentials', status: 'error' });
    }

    let token = generateToken(
      { username: user.username, role: user.role },
      '24h'
    );

    return res
      .status(200)
      .json({ message: 'Login successful!', token, code: 200, status: 'ok' });
  } catch (error) {
    console.log('logging in', error.message);
    res
      .status(404)
      .send({ code: 404, status: 'error', message: error.message });
  }
};

const UsersList = async (req: Request, res: Response) => {
  try {
    let data = await Users.find({});
    res.status(200).json({ message: '', status: 'ok', code: 200, data });
  } catch (error) {
    console.log('Error fetching users', error.message);
    res
      .status(404)
      .send({
        status: 'error',
        message: 'Error fetching user details',
        code: 404,
      });
  }
};

const MembersList = async (req: Request, res: Response) => {
  try {
    let data = await Account.find({});
    res.status(200).json({ data });
  } catch (error) {
    console.log('Error fetching members list', error.message);
    res.status(404).send({ error: error.message });
  }
};
export { Signup, Login, UsersList, MembersList };
