import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import { depositController, openAccountController, widthdrawController } from '../controllers/account.controller';
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

export default router;
