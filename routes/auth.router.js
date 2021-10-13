const authRouter = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware} = require('../middlewares');

authRouter.post('/login',
    authMiddleware.isAuthValid,
    authMiddleware.authLoginMiddleware,
    authController.loginController);

module.exports = authRouter;
