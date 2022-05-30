const { request,response} = require("express")

const getUsuario=(req,res=response)=>{
    const { saludo, nombre='sin nombre', apellido='sin apellido' }= req.query;
    res.status(200).json({saludo, nombre, apellido});
}
const postUsuario=(req=request,res=response)=>{
    const { name,surname,edad}=req.body
    res.status(200).json({name,surname,edad});
}
const putUsuario=(req=request,res=response)=>{
    const { id } = req.params;
    res.status(200).json({saludo:"api put",id:id});
}

const deleteUsuario=(req,res=response)=>{
    res.status(200).json({saludo:"api delete"});
}
module.exports={
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}

