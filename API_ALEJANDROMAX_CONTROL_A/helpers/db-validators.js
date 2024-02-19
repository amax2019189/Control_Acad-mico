const Profesor = require('../models/profesores');

const existenteEmail = async (correo = '') => {
    const existenteEmail = await Profesor.findOne({correo});
    if(existenteEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const existeProfesorById = async ( id = '') => {
    const existeProfesor = await Cursos.findOne({id});
    if(existeProfesor){
        throw new Error(`El Profesor con el ${ id } no existe`);
    }
}

module.exports = {
    existenteEmail,
    existeProfesorById
}