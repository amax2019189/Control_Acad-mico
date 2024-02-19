const { Schema, model} = require('mongoose');

const AlumnoSchema = Schema ({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        require: [true, 'La password es obligatoria']
    },
    role: {
        type: String,
        enum: ["TEACHER_ROLE","STUDENT_ROLE"],
        default: "STUDENT_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    },
    office: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Alumno', AlumnoSchema);