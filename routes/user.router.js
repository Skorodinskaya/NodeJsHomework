const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

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
    userController.deleteUser);

module.exports = router;
