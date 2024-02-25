let express = require('express');
let chatController = require('../controllers/chat');
let middlewareController = require('../middleware/authorization');
let router = express.Router();

router.get('/getchat',  middlewareController.getToken, chatController.getChat);

module.exports = router;