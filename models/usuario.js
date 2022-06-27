const { Schema, model } = require("mongoose")
const usuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    apellido:{
        type:String,
        required:[true,'El apellido es necesario']
    },
    correo:{
        type:String,
        required:[true,'El correo es requerido']
    },
    password:{
        type:String,
        required:[true,'La constraseña es obligatoria']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        //enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default:false
    }


});
usuarioSchema.methods.toJSON = function(){
    const { __v,_id,password,...usuario } = this.toObject();
    return usuario;
}
module.exports= model('usuario',usuarioSchema);

