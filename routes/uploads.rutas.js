/*
Hospitales 
'/api/todo/:busqueda'

*/


const { Router } = require('express');
const { check } = require('express-validator');
const { fileUpload, retornaImagen } = require('../controllers/uploads.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.use(expressFileUpload());
//tipo sea mediuco usuario u ospital
router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', retornaImagen);






module.exports = router