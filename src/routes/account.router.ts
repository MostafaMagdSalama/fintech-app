import express from 'express';
const router = express.Router();
import AuthMiddleware from '../middlewares/auth.middleware';
import { depositController, openAccountController, widthdrawController } from '../controllers/account.controller';

/* Account routes */
// open account route must be a protected router
router.post('/open', AuthMiddleware, openAccountController);
router.post('/deposit', AuthMiddleware, depositController);
router.post('/withdraw', AuthMiddleware, widthdrawController);


export default router;
