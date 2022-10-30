//create server express 
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');


const app = express();


//cors
app.use(cors());

// lectura y parseo del body
app.use(express.json());

//database
dbConnection();

//Rutas middlewares
app.use('/api/usuarios', require('./routes/usuarios.rutas'));
app.use('/api/hospitales', require('./routes/hospitales.rutas'));
app.use('/api/medicos', require('./routes/medicos.ruta'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busqueda.rutas'));
app.use('/api/upload', require('./routes/uploads.rutas'));


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
})