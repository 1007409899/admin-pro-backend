const jwt = require('jsonwebtoken');


const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            //expires in 30 days
            expiresIn: '30d'

        }, (err, token) => {
            if (err) {
                console.log(err);
                throw new Error('No se pudo generar el token');
            } else {
                resolve(token);
            }


        });

    })


}

module.exports = {
    generarJWT
}