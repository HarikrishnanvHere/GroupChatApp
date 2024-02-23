let express = require('express');
let userController = require('../controllers/user');
let router = express.Router();

router.post('/signup', userController.postSignUpUser);

router.post('/login',userController.postLoginUser);

module.exports = router;