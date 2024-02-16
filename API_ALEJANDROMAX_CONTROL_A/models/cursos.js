const { Schema, model} = require('mongoose');

const CursoSchema = Schema ({
    nombre: {
        type: String,
        require: [true, 'El nombre es un caracter obligatorio']
    },
    descripcion: {
        type: String,
        require: [true, 'Debe de contener una pequeña des.']
    },
    correo: {
        type: String,
        require: [true, 'El correo es necesario']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Cursos', CursoSchema);