const Alumno = require('../models/alumnos');

const existenteEmail = async (correo = '') => {
    const existenteEmail = await Alumno.findOne({correo});
    if(existenteEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const existeAlumnoById = async ( id = '') => {
    const existeAlumno = await Alumno.findOne({id});
    if(existeAlumno){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

module.exports = {
    existenteEmail,
    existeAlumnoById
}