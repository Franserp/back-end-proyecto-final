const express = require('express');
const sequelize = require('./db.js');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/usersRoutes.js'); 
const workspaceRoutes = require('./routes/workspacesRoutes.js'); 
const channelRoutes = require('./routes/channelsRoutes.js');
const messagesRoutes = require('./routes/messagesRoutes.js');
const defineAssociations = require('./models/associations');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 6543;


app.use(cors({
    origin: ['http://localhost:5173', "https://utn-proyecto-final-front-end-production.up.railway.app", "https://utn-proyecto-final-front-end.vercel.app" ], 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync({ force: true }) 
        .then(() => console.log('Base de datos conectada y sincronizada'))
        .catch(err => console.error('Error al conectar la base de datos:', err));


app.use(express.json());
app.use(cookieParser());



(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
defineAssociations();


app.use('/api', userRoutes);  
app.use('/api', workspaceRoutes);
app.use('/api', channelRoutes);
app.use('/api', messagesRoutes);


app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente!');
  });
  




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

; 

sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida correctamente'))
    .catch((error) => console.error('No se pudo conectar a la base de datos:', error));


    

    



module.exports = app;