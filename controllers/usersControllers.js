const { User } = require('../models/users');// Asegúrate de que la ruta al modelo es correcta
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas 
const jwt = require('jsonwebtoken'); // Para generar tokens
const sendEmail = require('../emailServices/emailServices');

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        // Obtener los datos del usuario desde el cuerpo de la solicitud
        const { username, email, password } = req.body;

        // Validar los datos del usuario
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'El email no tiene un formato válido.' });
        }

        // Validación de contraseña
        if (password.length < 8) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Verificar si ya existe un usuario con el mismo email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado.' });
        }

        // Crear el usuario en la base de datos
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });  // Aquí cerramos correctamente el objeto
        try {
            const emailResponse = await sendEmail(
                email,
                'Registro Exitoso',
                `¡Hola, ${username}! Tu cuenta ha sido creada con éxito.`
            );
            console.log('Correo enviado exitosamente:', emailResponse);
        } catch (emailError) {
            console.error('Error al enviar correo:', emailError.message);
            return res.status(500).json({ error: 'Registro exitoso, pero el correo no pudo ser enviado.' });
        }
        ;
        // Responder con los datos del usuario creado
        res.status(201).json({ message: "usuario creado con exito", user });
    } catch (error) {
        // Si hay algún error, responder con un código 500 y el mensaje de error
        res.status(500).json({ error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Generar el token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Enviar el token en una cookie
        res.cookie('token', token, {
            httpOnly: true, // Aumenta la seguridad contra XSS
            secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
            maxAge: 24 * 60 * 60 * 1000, // 1 día
            sameSite: 'none', // Previene CSRF
        });
        return res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            userId: user.id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Controlador para obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await User.findAll();

        // Responder con la lista de usuarios
        res.status(200).json(users);
    } catch (error) {
        // Si hay algún error, responder con un código 500 y el mensaje de error
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener un usuario por su ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el usuario en la base de datos por ID
        const user = await User.findByPk(id);

        // Si no se encuentra el usuario, responder con un error 404
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Responder con los datos del usuario
        res.status(200).json(user);
    } catch (error) {
        // Si hay algún error, responder con un código 500 y el mensaje de error
        res.status(500).json({ error: error.message });
    }
};

// Controlador para actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        // Buscar el usuario en la base de datos por ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Actualizar los datos del usuario
        user.username = username || user.username;
        user.email = email || user.email;
        await user.save();

        // Responder con el usuario actualizado
        res.status(200).json(user);
    } catch (error) {
        // Si hay algún error, responder con un código 500 y el mensaje de error
        res.status(500).json({ error: error.message });
    }
};

// Controlador para eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el usuario en la base de datos por ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Eliminar el usuario de la base de datos
        await user.destroy();

        // Responder con un mensaje de éxito
        res.status(200).json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        // Si hay algún error, responder con un código 500 y el mensaje de error
        res.status(500).json({ error: error.message });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'Sesión cerrada correctamente.' });
};


// Exportar los controladores para usarlos en las rutas
module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, logoutUser };
