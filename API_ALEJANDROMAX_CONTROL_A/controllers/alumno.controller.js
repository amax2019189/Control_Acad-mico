const { response, query } = require('express');
const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumnos');

/*const alumnosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, office, correo, ...resto} =req.body;
    
    const Alumno = await Alumno.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Alumno Actualizado exitosamente'
    });
} */

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
    alumnosPost
}