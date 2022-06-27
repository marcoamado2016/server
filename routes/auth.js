const {Router}= require('express');
const { check } = require('express-validator');
const { login } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const Usuario = require('../models/usuario')
const router = Router();
router.post('/',[
    check('correo','El correo es requerido').not().isEmpty(),
    check('correo','No tiene formato de correo').isEmail(),
    check('password','El password es requerio').not().isEmpty(),
    check('password','La contraseña como minimo tiene que tener 6 digitos').isLength({min:6}),
    check('correo').custom(async(correo)=>{
       const user = await Usuario.findOne({correo});
       if(!user){
            throw new Error("No existe el usuario registrado")
       }
    }),
    validarCampos
],login)
module.exports=router