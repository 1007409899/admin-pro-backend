const { response } = require('express')
const Hospital = require('../models/hospital');
const getHospitales = async(req, res) => {
    const hospitales = await Hospital.find()
        .populate('usuario', 'name email')


    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async(req, res) => {

    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalguardado = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalguardado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}




const actualizarHospital = async(req, res) => {
    const hospitalid = req.params.id;
    try {

        const hospitalDB = await Hospital.findById(hospitalid);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: req.uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalid, cambiosHospital, { new: true });

        res.json({
            ok: true,
            msg: 'hospital actualizado',
            hospitalActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}

const borrarHospital = async(req, res) => {
    const hospitalid = req.params.id;
    try {

        const hospitalDB = await Hospital.findById(hospitalid);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: req.uid
        }
        const hospitaleliminado = await Hospital.findByIdAndDelete(hospitalid)

        res.json({
            ok: true,
            msg: 'hospital eliminado',

        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}




module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}