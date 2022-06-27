const mongoose= require("mongoose");

const dbConnection =async()=>{
    try {
        await mongoose.connect(process.env.CONNECTION,{
        useNewUrlParser:true,
        useUnifiedTopology:true
        })
        console.log("Base de datos online")
    } catch (error) {
        throw new Error("Error en la base de datos"+error)
    }
}

module.exports={
    dbConnection
}