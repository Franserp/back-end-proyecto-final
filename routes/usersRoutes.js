const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, logoutUser } = require('../controllers/usersControllers');

// Ruta para crear un nuevo usuario
router.post('/users', createUser);

// Ruta para obtener todos los usuarios
router.get('/users',authenticateToken, getUsers);

// Ruta para obtener un usuario por ID
router.get('/users/:id',authenticateToken, getUserById);

// Ruta para actualizar un usuario por ID NO FUNCIONA

router.put('/users/:id',authenticateToken, updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/users/:id',authenticateToken, deleteUser);

router.post('/login', loginUser)

router.get('/logout', logoutUser)



module.exports = router;
