const router = require ('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.get('/:user_id', userController.getUsersById);
router.post('/', userMiddleware.createUserMiddleware,userController.createUser);

module.exports = router;
