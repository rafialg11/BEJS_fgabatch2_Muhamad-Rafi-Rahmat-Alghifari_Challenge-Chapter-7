var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Register Route
router.post('/register', userController.createUser);

//Login Route
router.post('/login', userController.login);

//Reset Password Route
router.post('/reset-password', userController.resetPassword);


module.exports = router;
