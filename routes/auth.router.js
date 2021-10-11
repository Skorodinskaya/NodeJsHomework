const authRouter = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

authRouter.post('/login',authMiddleware.isAuthValid,authMiddleware.authLoginMiddleware,authController.loginController);

module.exports = authRouter;
