const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeProfesorById } = require('../helpers/db-validators');

const { profesorPost, profesorGet, getProfesorByid, profesorPut, profesorDelete} = require('../controllers/profesor.Controller');

const router = Router();

router.post(
    "/",
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("password","La password debe de ser mayor a 6 caracteres").isLength({min: 6,}),
        check("correo","Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], profesorPost);

router.get("/", profesorGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato valio de MongoDB").isMongoId(),
        check("id").custom(existeProfesorById),
        validarCampos
    ], getProfesorByid);

router.put(
    "/:id",
    [
        check("id","El id no es un formato valio de MongoDB").isMongoId(),
        check("id").custom(existeProfesorById),
        validarCampos
    ], profesorPut);

router.delete(
    "/:id",
    [
        check("id","El id no es un formato valio de MongoDB").isMongoId(),
        check("id").custom(existeProfesorById),
        validarCampos
    ], profesorDelete);

module.exports = router;