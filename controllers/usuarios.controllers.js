const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {
    const desde = Number(req.query.desde) || 0;

    /* const usuario = await Usuario.find().
    skip(desde)
        .limit(5);

    const total = await Usuario.count(); */
    const [usuarios, total] = await Promise.all([
        Usuario.find().
        skip(desde)
        .limit(5),
        Usuario.countDocuments()
    ])

    res.json({
        ok: true,
        usuarios,
        total,
        uid: req.uid
    });
}
const crearUsuario = async(req, res = response) => {

    const { email, password, nombre } = req.body;
    //verificar correo usuario
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya esta registrado'
        });
    }


    const usuario = new Usuario(req.body);


    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar usuario

    await usuario.save();
    // generar token - jwt 
    const token = await generarJWT(usuario.id);
    res.json({
        ok: true,
        usuario: usuario,
        token
    });
}
const actualizarUsuario = async(req, res) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        //actualizaciones
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const borrarUsuario = async(req, res) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Usuario eliminado'

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}