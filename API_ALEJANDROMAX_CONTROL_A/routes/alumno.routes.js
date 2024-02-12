const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeAlumnoById } = require('../helpers/db-validators');

const { alumnoPost } = require('..//')

const router = Router();

router.post(
    "/",
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("password","La password debe de ser mayor a 6 caracteres").isLength({min: 6,}),
        check("correo","Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ] alumnoPost);
)