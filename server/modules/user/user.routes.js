import express from 'express';
import userController from './user.controller.js';

const router = express.Router();

router.get('/', userController.getUser)
router.post('/register', userController.register)

export default router;
