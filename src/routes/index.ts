import express from 'express';
import { healthCheck } from '../handlers/healthcheck';
import { createUserController, loginController } from '../controllers/user.controller';

const router = express.Router();

/* GET home page. */
router.get('/', healthCheck);
router.post('/signup', createUserController);
router.post('/login', loginController);

export default router;
