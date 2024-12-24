const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, logoutUser } = require('../controllers/usersControllers');


router.post('/users', createUser);


router.get('/users',authenticateToken, getUsers);


router.get('/users/:id',authenticateToken, getUserById);


router.delete('/users/:id',authenticateToken, deleteUser);

router.post('/login', loginUser)

router.get('/logout', logoutUser)



module.exports = router;
