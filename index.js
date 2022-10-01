//create server express 
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');


const app = express();


//cors
app.use(cors());

//database
dbConnection();

//create route
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
})