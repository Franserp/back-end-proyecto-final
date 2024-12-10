const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
    createWorkspace,
    getAllWorkspaces,
    getWorkspaceById,
    updateWorkspace,
    deleteWorkspace
} = require('../controllers/workspacesControllers');

router.use(authenticateToken);

// Definir las rutas
router.post('/workspaces', createWorkspace);
router.get('/workspaces', getAllWorkspaces);
router.get('/workspaces/:id', getWorkspaceById);
router.put('/workspaces/:id', updateWorkspace);
router.delete('/workspaces/:id', deleteWorkspace);

module.exports = router;
