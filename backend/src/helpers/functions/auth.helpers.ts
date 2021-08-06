import jwt from 'jsonwebtoken';
import config from 'config';

const generateToken = (payload: any, duration: string | number) => {
  return jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: duration });
};

export { generateToken };
