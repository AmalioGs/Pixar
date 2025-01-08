import express from 'express';
import userController from './user.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import multer from '../../middleware/multerSingle.js';

const router = express.Router();

// router.get('/', userController.getUser)
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/favFilm', userController.addFavFilm);
router.put('/editUser', multer("users"), userController.editUser);
router.get('/findUserById', verifyToken, userController.findUserById);

export default router;
