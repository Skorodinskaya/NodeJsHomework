const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');
const {ADMIN} = require('../configs');
const {userValidator: {createUserValidator, updateUserValidator}} = require('../validators');

router.get('/', userController.getUsers);

router.post(
    '/',
    userMiddleware.isUserBodyValid(createUserValidator),
    userMiddleware.checkEmail,
    userController.createUser);


router.get(
    '/:user_id',
    userMiddleware.checkById,
    userController.getUsersById);

router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(updateUserValidator),
    authMiddleware.checkAccessToken,
    userMiddleware.checkById,
    userController.updateUser);

router.delete(
    '/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.checkById,
    userMiddleware.checkRole([ADMIN]),
    userController.deleteUser);

module.exports = router;
