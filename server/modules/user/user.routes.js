import express from 'express';
import userController from './user.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

// router.get('/', userController.getUser)
router.post('/login', userController.login);
router.post('/register', userController.register)
router.get('/findUserById', verifyToken, userController.findUserById);

export default router;
