/**packages */

const mongoose = require("mongoose");

//creamos el esquemas - schema creation

const periodSchema = new mongoose.Schema({
    year:{
        type: "Number",
        required: true,
        min: 2021,
        max: 2030
    },
    number:{
        type:"Number",
        required: true,
        min: 1,
        max: 2
    },
    current:{ //actual
        type: "Boolean",
        required: true,
        default: true
    }
})

 //exportamos el esquema  - schema exportation

module.exports = periodSchema;