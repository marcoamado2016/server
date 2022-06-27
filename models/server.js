require('dotenv').config();
const express = require("express");
const cors = require("cors")
const {dbConnection} = require("../database/config")
class Server {
    constructor(){
        this.app=express();
        this.routerUsuario="/api/usuarios";
        this.routerAuth="/api/auth";
        this.routerFile="/api/file"
        this.port =process.env.PORT |3000;
        this.conectarBD();
        this.middlewares();
        this.routes();
        this.listen();
    }

    routes(){
        this.app.use(this.routerAuth,require('../routes/auth'))
        this.app.use(this.routerUsuario,require("../routes/user"))
        this.app.use(this.routerFile,require("../routes/file"))
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

    async conectarBD(){
        await dbConnection()
    }
}
module.exports=Server;