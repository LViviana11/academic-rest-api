/**packages */

const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator")

//creamos el esquemas - schema creation

const studentSchema = new mongoose.Schema({
    code:{
        type: "String",
        required: true,
        unique: true //único  PARA EL MANEJO DE CAMPOS UNICOS SE INSTALA UN PAQUETE ( npm i mongoose-unique-validator --save)
    },
    name:{
        type:"String",
        required: true,
    },
    lastname:{
        type:"String",
        required: true,
    },
    email:{
        type:"String",
        required: true,
        unique: true
    },
    phone:{
        type:"String",
        required: true,
    },
    career:{ //carrera
        type:"String",
        required: true,
    }
})
 //exportamos el esquema  - schema exportation
studentSchema.plugin(validator);
module.exports = studentSchema;