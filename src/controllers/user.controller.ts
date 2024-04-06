import { Request, Response } from 'express'; // Import the necessary types
import { createUser, findUserByEmail } from '../repositories/User.repo';
import { hashPassword } from '../helpers/utils';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, name, password, phone } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await createUser({ email, name, password: hashedPassword, phone });
    res.json({ name: user.name, email: user.email, phone: user.phone });
  } catch (error) {
    res.status(400).json({ error: 'something went wrong in user creation' });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const hashedPassword = await hashPassword(password);
    const isPasswordValid = await bcrypt.compare(hashedPassword, user.password);
    if (isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ email, id: user.id }, process.env.TOKEN_SECRET as string, { expiresIn: '1h' });

    res.json({ token, user: { email: user.email, name: user.name, phone: user.phone } });
  } catch (error) {
    res.status(400).json({ error: 'something went wrong in user login' });
  }
};
