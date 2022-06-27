const {request,response} = require('express')
const bcryptjs = require("bcryptjs")
const Usuario = require("../models/usuario")
const login=async(req=request,res=response)=>{
    const {correo,password}= req.body;
    try{
        //Verificar si el mail existe
        
        //Verificar si el usuario esta activo
        const filtro = { estado:true,correo}
        const user = await Usuario.findOne(filtro)
        //verificar constraseña
        console.log(user.password)
        console.log()      
        if(user){
            console.log("entre en el if")
            const cantidadVueltas = bcryptjs.genSaltSync();
            console.log("cantidad de vueltas",cantidadVueltas)
            const contrasenia = bcryptjs.hashSync(password,cantidadVueltas);
            console.log("contraseña usaurio",user.password)
            console.log("contraseña de password",contrasenia)
            if( user.password === contrasenia ){
                res.status(200).json({
                    msg:'Login ok '
                })
            }
        }
        //Generar token JWT

    }catch(error){
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }

}
module.exports={
    login
}