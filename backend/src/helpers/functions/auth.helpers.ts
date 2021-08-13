import jwt from 'jsonwebtoken';
import config from 'config';
import { NextFunction, Request, Response } from 'express';

const generateToken = (payload: any, duration: string | number) => {
  return jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: duration });
};

// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     //Get Authorization
//     const jwt  = req.headers['AUTH_TOKEN'];

//     if (jwt as string === undefined)
//       { jwt
//         return res.status(404).send({ error: 'Bad Token' });}

//     //Get Token
//     const bearerToken = bearerHeader.split(' ')[1];
//     req.token = bearerToken.split('"')[0];
//     const token = req.token;
//     //Decode token
//     const splittedToken = token.split('.')[1];
//     const tokenObj = JSON.parse(atob(splittedToken));

//     //Get Token expiry
//     const expireDate = tokenObj.exp;

//     //Check if token is expired
//     if (Date.now() >= expireDate * 1000)
//       return res.status(404).send({ error: 'Token Expired' });

//     //Get id
//     req.userid = tokenObj._id;

//     //Get id
//     req.isAdmin = tokenObj.isAdmin;

//     next();
//   } catch (error) {
//     res.status(404).send({ error: error.message });
//   }
// };
export { generateToken };
