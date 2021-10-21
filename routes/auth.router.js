const authRouter = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware} = require('../middlewares');

authRouter.post(
    '/login',
    authMiddleware.isAuthValid,
    authMiddleware.authLoginMiddleware,
    authController.loginController);

authRouter.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

authRouter.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

authRouter.post(
    '/password/forgot',
    authController.sendMailForgotPassword);

module.exports = authRouter;
