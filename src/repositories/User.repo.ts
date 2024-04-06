import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

export const findUserByEmail = async (email: string) => {
    return prisma.user.findFirst({
        where: {
            email,
        },
    });
};

export const createUser = async ({ email, name, password, phone }: Omit<User, 'id'>) => {
    return prisma.user.create({
        data: {
            email,
            name,
            password,
            phone,
        },
    });
};
