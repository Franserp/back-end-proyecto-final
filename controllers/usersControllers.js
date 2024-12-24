const { User } = require('../models/users');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const sendEmail = require('../emailServices/emailServices');


const createUser = async (req, res) => {
    try {
        
        const { username, email, password } = req.body;

       
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'El email no tiene un formato válido.' });
        }

 
        if (password.length < 8) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado.' });
        }

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });  
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
       
        res.status(201).json({ message: "usuario creado con exito", user });
    } catch (error) {
        
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

      
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

     
        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: 'none', 
        });
        return res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            userId: user.id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const getUsers = async (req, res) => {
    try {
        
        const users = await User.findAll();

       
        res.status(200).json(users);
    } catch (error) {
    
        res.status(500).json({ error: error.message });
    }
};


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

       
        const user = await User.findByPk(id);

      
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

   
        res.status(200).json(user);
    } catch (error) {
      
        res.status(500).json({ error: error.message });
    }
};


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

   
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

     
        user.username = username || user.username;
        user.email = email || user.email;
        await user.save();

      
        res.status(200).json(user);
    } catch (error) {
 
        res.status(500).json({ error: error.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

       
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }


        await user.destroy();

        
        res.status(200).json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        
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



module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, logoutUser };
