const { response, query } = require('express');
const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumnos');

const alumnosGet = async(req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total,alumnos] = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        alumnos
    });
}

const getAlumnosByid = async (req, res) => {
    const { id } = req.params;
    const alumno = await Alumno.findOne({_id: id});

    res.status(200).json({
        alumno
    });
}

const alumnosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto} =req.body;
    
    const alumno = await Alumno.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Alumno Actualizado exitosamente'
    });
}

const alumnosDelete = async (req, res) => {
    const {id} = req.params;
    const alumno = await Alumno.findByIdAndUpdate(id,{estado: false});

    res.status(200).json({
        msg: 'Alumno Eliminado exitosamente'
    });
}

const alumnosPost = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    const alumno = new Alumno({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    alumno.password = bcryptjs.hashSync(password, salt);

    await alumno.save();
    res.status(200).json({
        alumno
    });
}

module.exports = {
    alumnosPost,
    alumnosGet,
    getAlumnosByid,
    alumnosPut,
    alumnosDelete
}