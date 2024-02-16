const Alumno = require('../models/alumnos');
const Cursos = require('../models/cursos');

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

module.exports = {
    existenteEmail,
    existeCursosById
}