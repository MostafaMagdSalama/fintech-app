import { Request, Response } from 'express'; // Import the necessary types
import { createUser, deleteUser, findUserByEmail, getUserAccountByUserId, updateUser } from '../repositories/User.repo';
import { hashPassword } from '../helpers/utils';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, name, password, phone } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await createUser({ email, name, password: hashedPassword, phone });
    res.status(201).json({ name: user.name, email: user.email, phone: user.phone });
  } catch (error) {
    res.status(400).json({ error: 'something went wrong in user creation' });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const hashedPassword = await hashPassword(password);
    const isPasswordValid = await bcrypt.compare(hashedPassword, user.password);
    if (isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ email, id: user.id }, process.env.TOKEN_SECRET as string, { expiresIn: '1h' });

    res.json({ token, user: { email: user.email, name: user.name, phone: user.phone } });
  } catch (error) {
    res.status(400).json({ error: 'something went wrong in user login' });
  }
};

export const UpdateUserController = async (req: Request & { user: { id: string } }, res: Response) => {
  try {
    const { name, phone, email, password, id } = req.body;
    // not any user can edit another account
    if (id !== req.user.id) {
      return res.status(401).json({ error: 'not authorized to edit in this resource' });
    }
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const hashedPassword = await hashPassword(password);
    const updatedUser = await updateUser(id, { name, phone, email, password: hashedPassword });
    res.status(200).json({ email: updatedUser.email, name: updatedUser.name, phone: updatedUser.phone });
  } catch (error) {
    res.status(400).json({ error: 'something went wrong in user update' });
  }
};

export const deleteUserController = async (req: Request & { user: { id: string } }, res: Response) => {
  try {
    const { id } = req.params;
    // not any user can delete another account
    if (id !== req.user.id) {
      return res.status(401).json({ error: 'not authorized to delete in this resource' });
    }
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    await deleteUser(id);
    res.status(204).json({ message: 'user deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'something went wrong in user delete' });
  }
};



export const getUserAccountByUserIdController = async (req: Request & { user: { id: string } }, res: Response) => {
  try {
    const accounts = await getUserAccountByUserId(req.user.id);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(400).json({ error: 'something went wrong in user delete' });
  }
}