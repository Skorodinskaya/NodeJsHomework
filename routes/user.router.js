const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');
const {ADMIN} = require('../configs/user-roles.enum');

router.get('/', userController.getUsers);

router.post(
    '/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);


router.get(
    '/:user_id',
    userMiddleware.checkById,
    userController.getUsersById);

router.put(
    '/:user_id',
    userMiddleware.updateUserMiddleware,
    userMiddleware.checkById,
    userController.updateUser);

router.delete(
    '/:user_id',
    userMiddleware.checkById,
    userMiddleware.checkRole([ADMIN]),
    userController.deleteUser);

router.delete(
    '/',
    authMiddleware.checkAccessToken,
    userController.deleteAccount
);
module.exports = router;
