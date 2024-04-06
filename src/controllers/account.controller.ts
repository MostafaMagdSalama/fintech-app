import { Request, Response } from 'express';
import { deposit, getAccountById, openAccount, withdraw } from '../repositories/Account.repo';
import { User } from '@prisma/client';

export const openAccountController = async (req: Request & { user: User }, res: Response) => {
  // opening (create) account require userId to link with user table
  const { id: userId } = req.user;
  const account = await openAccount({ userId });
  console.log({ account: account });
  res.status(201).json(account);
};

export const depositController = async (req: Request & { user: User }, res: Response) => {
  const { accountId, amount } = req.body;
  console.log({ accountId, amount });
  // check if the account id is valid and related to loggedin user
  const account = getAccountById(accountId);
  if (!account) {
    return res.status(400).json({ error: 'Invalid account id' });
  }
  // check if the amount is valid greater than 0
  if (amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  await deposit({ accountId, amount });
  return res.status(201).json({ message: 'Deposit successful' });
};

export const widthdrawController = async (req: Request & { user: User }, res: Response) => {
  const { accountId, amount } = req.body;
  // check if the account id is valid and related to loggedin user
  const account = await getAccountById(accountId);
  if (!account) {
    return res.status(400).json({ error: 'Invalid account id' });
  }
  // check if the amount to decrement is valid greater than 0
  // in withdraw we can check if the amount is greater than the balance
  if (amount <= 0 && amount <= account.balance) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  await withdraw({ accountId, amount });
  return res.status(201).json({ message: 'withdraw successful' });
};
