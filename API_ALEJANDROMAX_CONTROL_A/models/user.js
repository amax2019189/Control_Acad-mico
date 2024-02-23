const { Schema, model} = require('mongoose');

const UserSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'The name is required']
    },
    correo: {
        type: String,
        required: [true, 'Email is mandatory']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role:{
        type: String,
        required: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);