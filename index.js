//create server express 
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//create express app    
const app = express();
/* const { auth , requiredScopes } = require('express-oauth2-jwt-bearer'); */
const { auth } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
    audience: 'api-auth-express-angular-avanzado',
    issuerBaseURL: `https://angular-tenant-dev.us.auth0.com/`,
});

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
/* var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://angular-tenant-dev.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'api-auth-express-angular-avanzado',
    issuer: 'https://angular-tenant-dev.us.auth0.com/',
    algorithms: ['RS256']
}); */




//cors
app.use(cors());

// lectura y parseo del body
app.use(express.json());

//database
dbConnection();
/* app.use(checkJwt) */

//Rutas middlewares
app.use('/api/usuarios', checkJwt, require('./routes/usuarios.rutas'));
app.use('/api/hospitales', require('./routes/hospitales.rutas'));
app.use('/api/medicos', require('./routes/medicos.ruta'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busqueda.rutas'));
app.use('/api/upload', require('./routes/uploads.rutas'));


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
})