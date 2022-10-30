const { response } = require('express')
const Medico = require('../models/medicos');
const getMedicos = async(req, res) => {
    const medicos = await Medico.find()
        .populate('usuario', 'name email')
        .populate('hospital', 'nombre')
    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async(req, res) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        hospital: req.hospital,
        ...req.body

    })
    try {

        const medicoguardado = await medico.save();
        res.json({
            ok: true,
            medico: medicoguardado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}

const actualizarMedico = (req, res) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const borrarMedico = (req, res) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}




module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}