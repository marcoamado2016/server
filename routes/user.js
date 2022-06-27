const { Router } = require("express")
const {check} = require("express-validator")
const { validarCampos } = require("../middlewares/validar-campos");
const { validateRol, validateEmail, validateUser } = require("../helpers/db-validators");
const Rol = require("../models/rol");
const Usuario = require("../models/usuario");
const {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
    getPaginado} =require("../controller/userController");


const router = Router();

router.get("/",[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('apellido','el apellido es obligatorio').not().isEmpty(),
    validarCampos
],getUsuario)
router.get('/filter/',
[
    check('limite','El limite es requerido').not().isEmpty(),
    check('desde','El desde es requerido').not().isEmpty(),
    validarCampos
]
,getPaginado)
router.post("/",[
    check('correo','El correo no es valido').isEmail(),
    check('nombre','El nombre no es valido').not().isEmpty(),
    check('apellido','El apellido no es vali do').not().isEmpty(),
    check('password','La contraseña no tiene que tener 6 digitos minimo').isLength({min: 6}),
    //check('rol','El rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    
    check('rol').custom(async(rol='')=>{
        const rolV = await Rol.findOne({rol});
        if (!rolV){
            throw new Error('El rol no existe')
        }
    }),
    
    //check('rol').custom((rol)=>validateRol(rol)),  
    validarCampos
    ],postUsuario)
//router.put("/:id/:nombre",putUsuario)
router.put("/:id",[
check('id','No es un id valido ').isMongoId(),
check('id').custom( async(id)=>{
    const user = await Usuario.findById(id);
    if ( !user ){
        throw new Error('El usuario no existe')
    }
}),
check('rol').custom(async(rol)=>{
    const RolV = await Rol.findOne({ rol});
    if( !RolV ){
        throw new Error("El rol no es valido")
    }
}),
validarCampos
],putUsuario)
router.delete("/:id",[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(async(id)=>{
        const user = await Usuario.findById(id)
        if( !user ){
            throw new Error('El usuario no existe')
        }
    }),
    validarCampos
],deleteUsuario)

module.exports =router;