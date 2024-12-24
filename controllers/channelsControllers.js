const Channel = require('../models/channels');
const Workspace = require('../models/workspaces');


const createChannel = async (req, res) => {
    try {
        const { workspace_id, name } = req.body;

       
        const workspace = await Workspace.findByPk(workspace_id);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace no encontrado' });
        }
        console.log(req.body);

      
        const channel = await Channel.create({ workspace_id, name });
        res.status(201).json(channel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllChannels = async (req, res) => {
    try {
        const channels = await Channel.findAll({ include: Workspace });
        res.status(200).json(channels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getChannelById = async (req, res) => {
    try {
        const { id } = req.params;
        const channel = await Channel.findByPk(id, { include: Workspace });

        if (!channel) {
            return res.status(404).json({ error: 'Channel no encontrado' });
        }

        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getChannelsByWorkspace = async (req, res) => {
    try {
        const { workspace_id } = req.params;

       
        const channels = await Channel.findAll({ where: { workspace_id } });

        if (channels.length === 0) {
            return res.status(404).json({ error: 'No se encontraron canales para este workspace' });
        }

        res.status(200).json(channels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const updateChannel = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const channel = await Channel.findByPk(id);
        if (!channel) {
            return res.status(404).json({ error: 'Channel no encontrado' });
        }

        await channel.update({ name });
        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteChannel = async (req, res) => {
    try {
        const { id } = req.params;

        const channel = await Channel.findByPk(id);
        if (!channel) {
            return res.status(404).json({ error: 'Channel no encontrado' });
        }

        await channel.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createChannel,
    getAllChannels,
    getChannelById,
    updateChannel,
    deleteChannel,
    getChannelsByWorkspace,
};
