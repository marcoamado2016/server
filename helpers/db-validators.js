const rol = require("../models/rol");
const usuario = require("../models/usuario");
const { request,response} = require("express")
const validateRol = async (r='')=>{
    const role = await  rol.findOne({ r });
    console.log(role)
    if(!role)  throw new Error(`El rol ${r} no existe en la base de datos`) ;
}
const validateEmail =  async (correo='',res=response) =>{
    console.log("Correo : ",correo)
    const usuarios = await usuario.findOne( { correo } )
    console.log("usuarios")
    console.log(usuarios)
    if (usuarios){
        console.log("Entreeee")
        return res.status(400).json({
            msg:'El correo ya existe'
        });
        
    }
    
}
const validateUser = async(id)=>{
    const user = await Usuario.findById(id);
    if ( !user ){
        throw new Error('El usuario no existe')
    }
}
module.exports={
    validateRol,
    validateEmail,
    validateUser
}