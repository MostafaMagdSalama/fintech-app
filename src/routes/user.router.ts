import express from 'express';
import { healthCheck } from '../handlers/healthcheck';
import {
  UpdateUserController,
  createUserController,
  deleteUserController,
  getUserAccountByUserIdController,
  loginController,
} from '../controllers/user.controller';
import { createUserSchema, deleteUserSchema, loginSchema, updateUserSchema } from '../validationSchemas/userValidation';
import validateRequestSchema from '../middlewares/validationRequestSchema.middleware';
import authenticateToken from '../middlewares/auth.middleware';
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

/**
 *
 * @openapi
 * /update:
 *  put:
 *   tags:
 *    - Users
 *   description: update user buy id
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *            id:
 *             type: string
 *            email:
 *               type: string
 *            phone:
 *              type: string
 *            name:
 *              type: string
 *            password:
 *               type: string
 *   responses:
 *    201:
 *      description: A successful response (user created successfully)
 *    400:
 *      description: Bad request
 *
 */

router.put('/update', updateUserSchema, validateRequestSchema, authenticateToken, UpdateUserController);
/**
 *
 * @openapi
 * /{id}:
 *  delete:
 *   tags:
 *    - Users
 *   description: delete user by id
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *   responses:
 *    204:
 *      description: A successful response (user deleted successfully)
 *    400:
 *      description: Bad request
 *    401:
 *      description: unAuthorized to access resource
 *
 */

router.delete('/:id', deleteUserSchema, validateRequestSchema, authenticateToken, deleteUserController);
/**
 *
 * @openapi
 * /getAccounts:
 *  get:
 *   tags:
 *    - Users
 *   description: get user accounts by id
 *   responses:
 *    200:
 *      description: A successful response (user deleted successfully)
 *    400:
 *      description: Bad request
 *
 */

router.get('/getAccounts', authenticateToken, getUserAccountByUserIdController);

export default router;
