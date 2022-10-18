const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //leer token 
    const token = req.header('x-token');
    console.log(token)

    if (!token) {
        return res.status(403).send({
            ok: false,
            message: 'No hay token en la peticion'
        })
    }
    try {
        //aqui comprobamos si hace el matched con el secret que tenemos en el .env y si es correcto nos devuelve el payload que es el uid que le hemos pasado en el payload del jwt.sign en el helpers/jwt.js  
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        //aqui le pasamos el uid al req para que lo pueda usar el resto de middlewares

        req.uid = uid;


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido',
        });
    }


    next();
}


module.exports = {
    validarJWT
}