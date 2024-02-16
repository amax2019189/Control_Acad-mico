const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeCursosById } = require('../helpers/db-validators');

const { cursosPost, cursosGet, getCursosByid} = require('../controllers/cursoController');

const router = Router();

router.post(
    "/",
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("descripcion","La descripcion es obligatoria").not().isEmpty(),
        check("correo","Este no es un correo valido").isEmail(),
        validarCampos,
    ], cursosPost);

router.get("/", cursosGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato valio de MongoDB").isMongoId(),
        check("id").custom(existeCursosById),
        validarCampos
    ], getCursosByid);

module.exports = router;