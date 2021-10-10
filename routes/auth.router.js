const authRouter = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

authRouter.post('/login', authMiddleware.authLoginMiddleware, authMiddleware.isAuthValid, authController.loginController);

module.exports = authRouter;
