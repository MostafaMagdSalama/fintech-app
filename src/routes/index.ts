import express from 'express';
import { healthCheck } from '../handlers/healthcheck';
import { createUserController, loginController } from '../controllers/user.controller';
import { createUserSchema, loginSchema } from '../validationSchemas/userValidation';
import validateRequestSchema from '../middlewares/validationRequestSchema.middleware';
const app = express();
const router = express.Router();
app.use(express.json());
/* GET home page. */
router.get('/', healthCheck);
router.post('/signup', createUserSchema, validateRequestSchema, createUserController);
router.post('/login', loginSchema, validateRequestSchema, loginController);

export default router;
