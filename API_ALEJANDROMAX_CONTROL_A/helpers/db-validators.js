const Alumno = require('../models/alumnos');
const Cursos = require('../models/cursos');
const Profesor = require('../models/profesores');

const existenteEmail = async (correo = '') => {
    const existenteEmail = await Alumno.findOne({correo});
    if(existenteEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const existeCursosById = async ( id = '') => {
    const existeCursos = await Cursos.findOne({id});
    if(existeCursos){
        throw new Error(`El Curso con el ${ id } no existe`);
    }
}

const existeProfesorById = async ( id = '') => {
    const existeProfesor = await Profesor.findOne({id});
    if(existeProfesor){
        throw new Error(`El Profesor con el ${ id } no existe`);
    }
}

module.exports = {
    existeCursosById,
    existenteEmail,
    existeProfesorById
}