const authRouter = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');

authRouter.post('/login',
    authMiddleware.isAuthValid,
    authMiddleware.authLoginMiddleware,
    userMiddleware.isUserPresent,
    authController.loginController);

module.exports = authRouter;
