const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
    createChannel,
    getAllChannels,
    getChannelById,
    updateChannel,
    deleteChannel,
    getChannelsByWorkspace
} = require('../controllers/channelsControllers');

router.use(authenticateToken);

router.post('/channels', createChannel);
router.get('/channels', getAllChannels);
router.get('/channels/workspace/:workspace_id', getChannelsByWorkspace);
router.get('/channels/:id', getChannelById);
router.put('/channels/:id', updateChannel);
router.delete('/channels/:id', deleteChannel);


module.exports = router;
