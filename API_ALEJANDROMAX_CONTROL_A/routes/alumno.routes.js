const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeAlumnoById } = require('../helpers/db-validators');

const { alumnosPost, alumnosGet, getAlumnosByid, alumnosPut, alumnosDelete} = require('../controllers/alumno.controller')

const router = Router();

router.get("/", alumnosGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato valio de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], getAlumnosByid);

router.put(
    "/:id",
    [
        check("id","El id no es un formato valio de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], alumnosPut);

router.delete(
    "/:id",
    [
        check("id","El id no es un formato valio de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], alumnosDelete);

router.post(
    "/",
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("password","La password debe de ser mayor a 6 caracteres").isLength({min: 6,}),
        check("correo","Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], alumnosPost);

module.exports = router;