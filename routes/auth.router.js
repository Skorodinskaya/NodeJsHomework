const authRouter = require('express').Router();

const authController = require('../controllers/auth.controller');
const userMiddleware = require('../middlewares/user.middleware');

authRouter.post('/login', userMiddleware.requiredDataMiddleware, authController.loginController);

module.exports = authRouter;
