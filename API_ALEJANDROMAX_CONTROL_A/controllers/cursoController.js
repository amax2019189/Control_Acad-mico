const { response, query } = require('express');
const bcryptjs = require('bcryptjs');
const Cursos = require('../models/cursos');

const cursosPost = async (req, res) => {
    const { nombre, descripcion, correo } = req.body;
    const cursos = new Cursos({nombre, descripcion, correo});

    await cursos.save();
    res.status(200).json({
        cursos
    });
}

const cursosGet = async(req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total,cursos] = await Promise.all([
        Cursos.countDocuments(query),
        Cursos.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

const getCursosByid = async (req, res) => {
    const { id } = req.params;
    const cursos = await Cursos.findOne({_id: id});

    res.status(200).json({
        cursos
    });
}

const cursosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, correo, ...resto} =req.body;
    
    const cursos = await Cursos.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Curso Actualizado exitosamente'
    });
}

const cursosDelete = async (req, res) => {
    const {id} = req.params;
    const cursos = await Cursos.findByIdAndUpdate(id,{estado: false});

    res.status(200).json({
        msg: 'Curso Eliminado exitosamente'
    });
}

module.exports = {
    cursosPost,
    cursosGet,
    getCursosByid,
    cursosPut,
    cursosDelete
}