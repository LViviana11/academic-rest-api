/**packages */

const mongoose = require("mongoose") // llamamos el paquete que instalamos
const db = require("../db-connection/mongodb")

/** using schema - importando los esquemas  */

const schema = require("../schemas/student.schema")
db();

schema.statics = { 
    //definimos un objeto que permite creas varias funciones 
    create: function(data, cb){
        let doc = new this(data); // this hace referencia al schema de la linea 9 que viene desde el student.schema y con la info que llega en data
        doc.save(cb); // guardamos y llamamos inmediatamente al cb que es la función que nos esta esperando en el controlador
    },
    getAll: function(query, cb){ //query:  consulta social 
        this.find(query, cb); 
    },
    getByCode: function(query, cb){ 
        this.find(query, cb); 
    },
    update: function(query, data,  cb){ 
        this.findOneAndUpdate(query,{$set: data},{new: true}, cb); 
    },
    delete: function(query, cb){ //entra el query que se va a eliminar 
        this.findOneAndDelete(query);
    }

};

const dto = mongoose.model("coll_student", schema);
module.exports = dto;
