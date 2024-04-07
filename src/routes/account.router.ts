import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import { depositController, getAccountByIdController, openAccountController, widthdrawController } from '../controllers/account.controller';
import { depositevalidation, withdrawValidation } from '../validationSchemas/accountValidation';
import validateRequestSchema from '../middlewares/validationRequestSchema.middleware';

const router = express.Router();

/* Account routes */
// open account route must be a protected router

/**
 * @openapi
 * /account/open:
 *  post:
 *   tags:
 *    - Account
 *   description: create account, the user must be logged in to create an account
 *   responses:
 *    201:
 *      description: A successful response (account created successfully)
 *    400:
 *      description: Account creation failed
 */
router.post('/open', AuthMiddleware, openAccountController);

/**
 *  @openapi
 * /account/deposit:
 *  post:
 *   tags:
 *    - Account
 *   description: make a deposite transaction and update account balance
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             accountId:
 *               type: string
 *             amount:
 *               type: number
 *   responses:
 *    201:
 *      description: A successful response (deposite transaction successfully done)
 *    400:
 *      description: Missing or invalid attributes in request.
 */

router.post('/deposit', AuthMiddleware, depositevalidation, validateRequestSchema, depositController);

/**
 *  @openapi
 * /account/withdraw:
 *  post:
 *   tags:
 *    - Account
 *   description: make a withdraw transaction and update account balance
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             accountId:
 *               type: string
 *             amount:
 *               type: number
 *   responses:
 *    201:
 *      description: A successful response (withdraw transaction successfully done)
 *    400:
 *      description: Missing or invalid attributes in request.
 */
router.post('/withdraw', AuthMiddleware, withdrawValidation, validateRequestSchema, widthdrawController);

/**
 *  @openapi
 * /account/{id}:
 *  get:
 *   tags:
 *    - Account
 *   description: get account by id
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *   responses:
 *    200:
 *      description: A successful response (account retrieved successfully)
 *    400:
 *      description: Missing or invalid attributes in request.
 *    401:
 *      description: unAuthorized to access resource
 *
 *
 */
router.get('/:id', AuthMiddleware, getAccountByIdController);

/**
 *  @openapi
 * /account/{id}:
 *  delete:
 *   tags:
 *    - Account
 *   description: delete account by id
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *   responses:
 *    204:
 *      description: A successful response (account deleted successfully)
 *    401:
 *      description: unAuthorized to access resource
 *    400:
 *      description: Missing or invalid attributes in request.
 */

router.delete('/:id', AuthMiddleware, getAccountByIdController);

export default router;
