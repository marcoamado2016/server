const { request,response} = require("express")
const Usuario = require("../models/usuario")
const bcryptjs = require("bcryptjs")
const {validationResult} = require("express-validator")
const getUsuario=async (req=request,res=response)=>{
    const {nombre='sin nombre', apellido='sin apellido' }= req.query;
    try{
        const user = await Usuario.findOne({nombre,apellido});
        const result = user ? res.status(200).json(user) : res.json({ msg:'No existe el usuario'});
        return result;
    }catch(err){
     res.status(500).json(err)
    }

    //res.status(200).json({saludo, nombre, apellido});
}
const getPaginado = async (req=request,res=response)=>{
    const { limite = 5,desde = 0 }= req.query;
    try {
        
        const active = {estado:true}
        
        const users= await Usuario.find(active)
        .limit(Number(limite))
        .skip(Number(desde))
        const cantidad = await Usuario.count(active);
            console.log(users)
            console.log(cantidad)
           /*
       const [users,cantidad]= await Promise.all([
            Usuario.find(active)
            .limit(Number(limite))
            .skip(Number(desde)),
            Usuario.countDocuments(active)
        ])

*/
        res.status(200).json(
         {   users,
            cantidad}
            )
    } catch (error) {
       res.status(500).json(error) 
    }

}
const postUsuario=async (req=request,res=response)=>{
    const  body =req.body
    
    const { password, correo}=req.body;
   
    try {

            const usuario = new Usuario( body);
        
            const existeEmail = await Usuario.findOne({correo})
    
            if (existeEmail){
                return res.status(400).json({
                    msg:'El correo ya existe'
                });
            }
    
            
            const cantVueltas = bcryptjs.genSaltSync();
            usuario.password=bcryptjs.hashSync(password,cantVueltas)
            await usuario.save();
    
        
        res.status(200).json(usuario);   
        

    } catch (error) {
        res.status(500).json(error);
    }
    
}
const putUsuario=async (req=request,res=response)=>{
    const { id } = req.params;
    const { password ,google , ...resto} = req.body;
    if ( password ){
        const cantidadVueltas =bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,cantidadVueltas)
    }
    const usuarioUpdate = await Usuario.findByIdAndUpdate( id ,resto)
    res.status(200).json({
        msg:"api put",
        parametro:id,
        usuarioUpdate
    
    });
}

const deleteUsuario= async (req,res=response)=>{
    const { id }= req.params;
    const userDelete = await Usuario.findByIdAndUpdate(id,{estado:false})
    res.status(200).json( userDelete );
}
module.exports={
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
    getPaginado
}

