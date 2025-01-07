import express from 'express';
import userController from './user.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.get('/', userController.getUser)
router.post('/register', userController.register)
router.post('/login', userController.login);
router.get('/pelis', userController.pelis);
router.get('/findUserById', verifyToken, userController.findUserById);
router.post('/loginPrueba', userController.prueba);

export default router;
