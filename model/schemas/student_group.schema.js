/**packages */

const { Mongoose } = require("mongoose");

const mongoose = require("mongoose");

//creamos el esquemas - schema creation

const studentGroupSchema = new mongoose.Schema({
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"coll_student",
        required: true
    },
    group_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"coll_group",
        required: true
    }
})

 //exportamos el esquema  - schema exportation

module.exports = studentGroupSchema;