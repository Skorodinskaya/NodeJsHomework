const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');
const {user_roles_enum} = require('../configs');
const {userValidator: {createUserValidator, updateUserValidator}} = require('../validators');

router.get('/', userController.getUsers);

router.get(
    '/:user_id',
    userMiddleware.checkById,
    userController.getUsersById);

router.post(
    '/',
    userMiddleware.isUserBodyValid(createUserValidator),
    userMiddleware.checkEmail,
    userController.createUser);

// router.use(userMiddleware.isUserActive);

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
    userMiddleware.checkRole([user_roles_enum.ADMIN]),
    userController.deleteUser);

module.exports = router;
