var express = require('express');
var router = express.Router();
var User = require('../controller/userController');
/* GET users listing. */
router.get('/', User.getAll);
router.get('/name/:name', User.getUser);
router.post('/inscription', User.inscription);
router.get('/verifyMail', User.verifyMail);
router.delete('/', User.deleteUser);

module.exports = router;