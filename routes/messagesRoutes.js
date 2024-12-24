const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
    createMessage,
    getMessages,
    getMessagesByChannel,
    deleteMessage
} = require('../controllers/messagesControllers');

router.use(authenticateToken);


router.post('/messages', createMessage);


router.get('/messages', getMessages);


router.get('/channel/:channel_id', getMessagesByChannel, authenticateToken);

router.delete('/messages/:id', deleteMessage);

module.exports = router;
