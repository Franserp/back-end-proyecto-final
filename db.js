const { Sequelize } = require('sequelize');
require('dotenv').config();



const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nombre de la base de datos
    process.env.DB_USER,      // Usuario
    process.env.DB_PASSWORD,  // Contraseña
    {
        host: process.env.DB_HOST, // Host (generalmente localhost)
        dialect: 'mysql',          // Tipo de base de datos
        port: process.env.DB_PORT, // Puerto (generalmente 3306)
        logging: false,            // Desactiva logs para limpiar la consola
    }
);

module.exports = sequelize;
