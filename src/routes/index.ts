import express from 'express';
import { healthCheck } from '../handlers/healthcheck';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { createUserController, loginController } from '../controllers/user.controller';

const router = express.Router();

/* GET home page. */
router.get('/', healthCheck);
router.post('/signup',createUserController);
router.post('/login',loginController )

export default router;
