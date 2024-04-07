import express from 'express';
import { healthCheck } from '../handlers/healthcheck';
import { createUserController, loginController } from '../controllers/user.controller';
import { createUserSchema, loginSchema } from '../validationSchemas/userValidation';
import validateRequestSchema from '../middlewares/validationRequestSchema.middleware';
const app = express();
const router = express.Router();
app.use(express.json());

router.get('/', healthCheck);
/**
 *
 * @openapi
 * /signup:
 *  post:
 *   tags:
 *    - Users
 *   description: create users
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             phone:
 *              type: string
 *             name:
 *              type: string
 *             password:
 *               type: string
 *   responses:
 *    201:
 *      description: A successful response (user created successfully)
 *    400:
 *      description: Bad request
 *
 */

router.post('/signup', createUserSchema, validateRequestSchema, createUserController);
/**
 *
 * @openapi
 * /login:
 *  post:
 *   tags: 
 *    - Users 
 *   description: login users
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *   responses:
 *    200:
 *      description: A successful response
 *    400:
 *      description: Bad request
 *    401:
 *      description: Unauthorized - Email does not exist or password is incorrect
 *    
 
 */

router.post('/login', loginSchema, validateRequestSchema, loginController);

export default router;
