const Workspace = require('../models/workspaces');

// Crear un nuevo workspace
const createWorkspace = async (req, res) => {
    try {
        const { name } = req.body;
        const workspace = await Workspace.create({ name });
        res.status(201).json(workspace);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los workspaces
const getAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.findAll();
        res.status(200).json(workspaces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un workspace por ID
const getWorkspaceById = async (req, res) => {
    try {
        const { id } = req.params;
        const workspace = await Workspace.findByPk(id);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace no encontrado' });
        }
        res.status(200).json(workspace);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un workspace
const updateWorkspace = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const workspace = await Workspace.findByPk(id);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace no encontrado' });
        }

        await workspace.update({ name });
        res.status(200).json(workspace);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un workspace
const deleteWorkspace = async (req, res) => {
    try {
        const { id } = req.params;

        const workspace = await Workspace.findByPk(id);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace no encontrado' });
        }

        await workspace.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createWorkspace,
    getAllWorkspaces,
    getWorkspaceById,
    updateWorkspace,
    deleteWorkspace,
};
