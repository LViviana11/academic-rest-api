/**Dto
 *          me permite recibir informacion que gener require y poder enviarla a alas funciones de dto  que se construyeron  */ 

const courseDto = require("../../model/dto/course.dto");
const userDto = require("../../model/dto/user.dto");
const config = require("config");



exports.createCourse = (req, res, next) =>{
    
    let course ={
        code: req.body.code, 
        name: req.body.name
       
    };
    courseDto.create(course, (err, data) =>{
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
            res.status(201).json(
                {
                    info: data
                }
            );

    });
};

exports.updateCourse = (req, res, next) =>{
    let course ={
        code: req.body.code, 
        name: req.body.name
    };

    courseDto.update({_id: req.body.id}, course, (err, data) =>{
       
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
       
        return res.status(201).json(
            {
                info: data
            }
        );
    });
    
};

exports.getAll = (req, res, next) =>{

    courseDto.getAll({}, (err, data) =>{
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        );
    });
    
};

exports.getByCode = (req, res, next) =>{

    periodDto.getByCode({code: req.params.code}, (err, data) =>{
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        );
    });
    
};


exports.deleteCourse = () =>{

    coursetDto.delete({_id: req.body.id}, (err, data) =>{
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(204).json();
    });
    
};

