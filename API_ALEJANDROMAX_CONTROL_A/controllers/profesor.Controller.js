const { response, query } = require('express');
const bcryptjs = require('bcryptjs');
const Profesores = require('../models/profesores');
const profesores = require('../models/profesores');

const profesorPost = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    const profesor = new profesores({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    profesor.password = bcryptjs.hashSync(password, salt);

    await profesor.save();
    res.status(200).json({
        profesor
    });
}

const profesorGet = async(req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total,profesor] = await Promise.all([
        Profesores.countDocuments(query),
        Profesores.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        profesor
    });
}

const getProfesorByid = async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesores.findOne({_id: id});

    res.status(200).json({
        profesor
    });
}

const profesorPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto} =req.body;
    
    const profesor = await Profesores.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Profesor Actualizado exitosamente'
    });
}

const profesorDelete = async (req, res) => {
    const {id} = req.params;
    const profesor = await Profesores.findByIdAndUpdate(id,{estado: false});

    res.status(200).json({
        msg: 'Profesor Eliminado exitosamente'
    });
}

module.exports = {
    profesorPost,
    profesorGet,
    getProfesorByid,
    profesorPut,
    profesorDelete
}