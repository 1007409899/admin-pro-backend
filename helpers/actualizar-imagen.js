const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const fs = require('fs');
const borrarImagen = (pathViejo) => {

    //si existe elimina la imagen anterior
    if (fs.existsSync(pathViejo)) {
        fs.unlinkSync(pathViejo);
    }
}
const actualizarImagen = async(tipo, id, path, nombreArchivo) => {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id)

            if (!medico) {

                return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo)
            medico.img = nombreArchivo;
            medico.save((err, medicoActualizado) => {
                return true;
            });

            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id)

            if (!hospital) {

                return false;
            }
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo)
            hospital.img = nombreArchivo;
            hospital.save((err, medicoActualizado) => {
                return true;
            });

            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id)

            if (!usuario) {

                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo)
            usuario.img = nombreArchivo;
            usuario.save((err, medicoActualizado) => {
                return true;
            });


            break;
    }
}

module.exports = {
    actualizarImagen
}