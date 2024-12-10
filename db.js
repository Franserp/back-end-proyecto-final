const { Sequelize } = require('sequelize');
require('dotenv').config();



const sequelize = new Sequelize(
    process.env.DB_URL, // Contraseña
    {
        // Host (generalmente localhost)
        dialect: 'mysql',    
        logging: false      // Tipo de base de datos
         // Puerto (generalmente 3306)
                  // Desactiva logs para limpiar la consola
    }
);

module.exports = sequelize;
