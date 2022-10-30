const { response } = require('express');
const Medicos = require('../models/medicos');
const Usuarios = require('../models/usuario');
const Hospitales = require('../models/hospital');
const getTodo = async(req, res) => {
    const busqueda = req.params.busqueda;
    //insensitive case

    const regex = new RegExp(busqueda, 'i');

    await Promise.all([
        Usuarios.find({ name: regex }),
        Medicos.find({ nombre: regex }),
        Hospitales.find({ nombre: regex }),
    ]).then((respuestas) => {
        res.json({
            ok: true,
            usuarios: respuestas[0],
            medicos: respuestas[1],
            hospitales: respuestas[2],
        });
    });

}
const getDocumentosColeccion = async(req, res) => {
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    //insensitive case
    let data;
    switch (tabla) {
        case 'medicos':
            data = await Medicos.find({ nombre: regex }).populate('usuario', 'name ').populate('hospital', 'nombre ');
            break;
        case 'hospitales':
            data = await Hospitales.find({ nombre: regex });
            break;
        case 'usuarios':
            data = await Usuarios.find({ name: regex });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            })



    }
    res.json({
        ok: true,
        resultados: data
    });



}
module.exports = {
    getTodo,
    getDocumentosColeccion
}