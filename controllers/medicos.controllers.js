const { response } = require('express');

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

const actualizarMedico = async(req, res) => {
    const medicoid = req.params.id;
    try {

        const medicoDB = await Medico.findById(medicoid);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con ese id'
            })
        }

        const cambiosmedico = {
            ...req.body,
            usuario: req.uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoid, cambiosmedico, { new: true });

        res.json({
            ok: true,
            msg: 'hospital actualizado',
            medicoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}

const borrarMedico = async(req, res) => {
    const medicoid = req.params.id;
    try {

        const medicoDB = await Medico.findById(medicoid);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con ese id'
            })
        }


        const medicoeliminado = await Medico.findByIdAndDelete(medicoid)

        res.json({
            ok: true,
            medicoeliminado,
            msg: 'medico eliminado',

        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}




module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}