/**packages */

const { Mongoose } = require("mongoose");

const mongoose = require("mongoose");

//creamos el esquemas - schema creation

const groupSchema = new mongoose.Schema({
    course_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"coll_curse",
        required: true
    },
    period_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"coll_period",
        required: true
    },
    teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"coll_teacher",
        required: true
    },
    number:{
        type:"Number",
        required: true,
    }
})

 //exportamos el esquema  - schema exportation

module.exports = groupSchema;