let express = require('express');
let userController = require('../controllers/user');
let middlewareController = require('../middleware/authorization');
let router = express.Router();

router.post('/signup', userController.postSignUpUser);

router.post('/login', userController.postLoginUser);

router.get('/logout', middlewareController.getToken, userController.getLogOutUser);

module.exports = router;