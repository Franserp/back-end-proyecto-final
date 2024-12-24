const express = require('express');
const sequelize = require('./db.js'); // Importa el archivo db.js
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/usersRoutes.js');  // Importamos las rutas de usuario
const workspaceRoutes = require('./routes/workspacesRoutes.js'); 
const channelRoutes = require('./routes/channelsRoutes.js');
const messagesRoutes = require('./routes/messagesRoutes.js');
const defineAssociations = require('./models/associations');
const bodyParser = require('body-parser');

// http://localhost:5000/api/.. 

const app = express();
const PORT = process.env.PORT || 6543;


app.use(cors({
    origin: ['http://localhost:5173',"https://utn-proyecto-final-front-rh0nprzhi-francisco-contreras-projects.vercel.app", "https://utn-proyecto-final-front-end.vercel.app/", ], // Cambia esto por la URL de tu frontend en producción.
    credentials: true, // Permitir cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); // Maneja todas las solicitudes preflight
app.use(bodyParser.json()); // Para analizar datos JSON 
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync({ force: true }) // force: false evita sobrescribir datos existentes
        .then(() => console.log('Base de datos conectada y sincronizada'))
        .catch(err => console.error('Error al conectar la base de datos:', err));

// Middleware
app.use(express.json());
app.use(cookieParser());


// Probar conexión a la base de datos
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
defineAssociations();


app.use('/api', userRoutes);  // Rutas para usuarios estarán bajo /api/users
app.use('/api', workspaceRoutes);
app.use('/api', channelRoutes);
app.use('/api', messagesRoutes);


app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente!');
  });
  



// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

;  // Asegúrate de importar correctamente tu archivo de configuración

sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida correctamente'))
    .catch((error) => console.error('No se pudo conectar a la base de datos:', error));


    

    



module.exports = app;