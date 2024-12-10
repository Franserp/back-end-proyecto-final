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

// Ruta para crear un mensaje
router.post('/messages', createMessage);

// Ruta para obtener todos los mensajes
router.get('/messages', getMessages);

// Ruta para obtener mensajes por ID de canal
router.get('/channel/:channel_id', getMessagesByChannel, authenticateToken);

// Ruta para eliminar un mensaje por ID
router.delete('/messages/:id', deleteMessage);

module.exports = router;
