/**packages */

const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator")

//creamos el esquemas - schema creation

const teacherSchema = new mongoose.Schema({
    document:{
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
    office:{
        type:"String",
        required: true,
    },
    department:{
        type:"String",
        required: true,
    }
})
 //exportamos el esquema  - schema exportation
teacherSchema.plugin(validator);
module.exports = teacherSchema;