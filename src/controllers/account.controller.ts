import { Request, Response } from 'express';
import { deposit, getAccountById, openAccount, withdraw } from '../repositories/Account.repo';
import { User } from '@prisma/client';

export const openAccountController = async (req: Request & { user: User }, res: Response) => {
  // opening (create) account require userId to link with user table
  try {
    const { id: userId } = req.user;
    const account = await openAccount({ userId });
    console.log({ account: account });
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: 'Account creation failed' });
  }
};

export const depositController = async (req: Request & { user: User }, res: Response) => {
  const { accountId, amount } = req.body;
  // check if the account id is valid and related to loggedin user
  try {
    const account = getAccountById(accountId);
    if (!account) {
      return res.status(400).json({ error: 'Invalid account id' });
    }
    // check if the amount is valid greater than 0
    if (amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    const transaction = await deposit({ accountId, amount });
    if (!transaction) {
      return res.status(400).json({ error: 'Deposit failed' });
    }
    return res.status(201).json({ message: 'Deposit successful' });
  } catch (error) {
    return res.status(400).json({ error: 'Deposit failed' });
  }
};

export const widthdrawController = async (req: Request & { user: User }, res: Response) => {
  const { accountId, amount } = req.body;
  // check if the account id is valid and related to loggedin user
  try {
    const account = await getAccountById(accountId);
    if (!account) {
      return res.status(400).json({ error: 'Invalid account id' });
    }
    // check if the amount to decrement is valid greater than 0
    // in withdraw we can check if the amount is greater than the balance
    if (amount <= 0) {
      return res.status(400).json({ error: 'Please enter a valid amount. Amounts cannot be negative.' });
    }
    if (amount > account.balance) {
      return res.status(400).json({ error: 'Please enter a valid amount. Amounts cannot be less than balance.' });
    }
    const transaction = await withdraw({ accountId, amount });
    if (!transaction) {
      return res.status(400).json({ error: 'Withdraw failed' });
    }
    return res.status(201).json({ message: 'withdraw successful' });
  } catch (error) {
    return res.status(400).json({ error: 'Withdraw failed' });
  }
};
