import { Account, PrismaClient, Transaction } from '@prisma/client';

const prisma = new PrismaClient();

// i assumed to open an account, the balance should be 0
// this functionlity cen be extended to accept an initial balance
export const openAccount = async ({ userId }: Pick<Account, 'userId'>) => {
  const account = await prisma.account.create({
    data: {
      balance: 0,
      userId,
    },
  });
  return account;
};

// impelemet withdraw functionality in transaction statment so if the withdraw is successful, the transaction is logged
export const withdraw = async ({ accountId, amount }: { accountId: string; amount: number }) => {
  prisma.$transaction(async (tx) => {
    const account = await tx.account.update({
      where: { id: accountId },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    if (account.balance < 0) {
      throw new Error(` doesn't have enough to send ${amount}`);
    }

    const transactionLog = await tx.transaction.create({
      data: {
        amount,
        type: 'WITHDRAW',
        accountId,
      },
    });
  });
};
// impelement deposit functionality in transaction statment so if the deposit is successful, the transaction is logged
export const deposit = async ({ accountId, amount }: { accountId: string; amount: number }) => {
  prisma.$transaction(async (tx) => {
    const account = await tx.account.update({
      where: { id: accountId },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
    // we can check if the amout to exceed the limit if there is any limit

    await tx.transaction.create({
      data: {
        amount,
        type: 'DEPOSIT',
        accountId,
      },
    });
  });
};

export const getAccountById = async (id: string) => {
  const account = await prisma.account.findFirst({ where: { id } });
  return account;
};
