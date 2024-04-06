import { body } from 'express-validator';

export const loginSchema = [body('email').isEmail(), body('password').isLength({ min: 6 })];
export const createUserSchema = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').isString(),
  body('phone').isMobilePhone('ar-EG'),
];
