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
    authMiddleware.userLogoutMiddleware,
    authController.logout);

authRouter.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

module.exports = authRouter;
