/**packages */

const mongoose = require("mongoose");

//creamos el esquemas - schema creation

const courseSchema = new mongoose.Schema({
    code:{
        type: "String",
        required: true,
    },
    name:{
        type:"String",
        required: true,
    }
})

 //exportamos el esquema  - schema exportation

module.exports = courseSchema;