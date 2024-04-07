import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken');

function authenticateToken(req: Request & { user: User }, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);
  console.log({ token });
  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err);
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}
export default authenticateToken;
