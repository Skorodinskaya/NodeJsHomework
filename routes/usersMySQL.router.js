const router = require('express').Router();

const { usersMySQLController } = require('../controllers');

router.get('/', usersMySQLController.getAll);
router.post('/', usersMySQLController.createUser);

module.exports = router;
