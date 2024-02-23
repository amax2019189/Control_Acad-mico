const User = require('../models/user');
const Role = require('../models/role');

const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El role ${ role } no existe en base de datos.` )
    }
}

module.exports = {
    existenteEmail,
    esRolValido
}