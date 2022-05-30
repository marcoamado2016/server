require('dotenv').config();
const express = require("express");
const cors = require("cors")
class Server {
    constructor(){
        this.app=express();
        this.routerUsuario="/api/usuarios";
        this.port =process.env.PORT |3000;
        this.middlewares();
        this.routes();
        this.listen();
    }

    routes(){
    this.app.use(this.routerUsuario,require("../routes/user"))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static("public"))
    }
}
module.exports=Server;