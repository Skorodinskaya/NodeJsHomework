const authRouter = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');
const {authValidator: {emailValidator, passwordValidator}} = require('../validators');

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
    userMiddleware.isUserBodyValid(emailValidator),
    authMiddleware.authLoginMiddleware,
    authController.sendMailForgotPassword);

authRouter.put(
    '/password/forgot',
    userMiddleware.isUserBodyValid(passwordValidator),
    authMiddleware.checkActionToken,
    authController.setNewPasswordAfterForgot);

authRouter.get(
    '/activate/:token',
    authMiddleware.checkActivateToken,
    authController.activate);

module.exports = authRouter;
