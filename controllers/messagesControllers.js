const Message = require('../models/messages');
const { User } = require('../models/users');

// Crear un mensaje
const createMessage = async (req, res) => {
    try {
        const { channel_id, content } = req.body;
        const user_id = req.user.id;
        const username = await User.findOne({ where: { id: user_id } });
        const newMessage = await Message.create({ channel_id, user_id, content, username });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los mensajes
const getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener mensajes por ID de canal
const getMessagesByChannel = async (req, res) => {
    try {
        const { channel_id } = req.params;
        const messages = await Message.findAll({ where: { channel_id } });
        res.status(200).json(messages || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un mensaje
const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Message.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Mensaje no encontrado.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createMessage,
    getMessages,
    getMessagesByChannel,
    deleteMessage
};
