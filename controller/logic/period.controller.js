/**Dto
 *          me permite recibir informacion que gener require y poder enviarla a alas funciones de dto  que se construyeron  */ 

const periodDto = require("../../model/dto/period.dto");
const userDto = require("../../model/dto/user.dto");
const config = require("config");



exports.createPeriod = (req, res, next) =>{
    
    let period ={
        year: req.body.year, 
        number: req.body.number,
        current: req.body.current,
       
    };
    periodDto.create(period, (err, data) =>{
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

exports.updatePeriod = (req, res, next) =>{
    let period ={
        year: req.body.year, 
        number: req.body.number,
        current: req.body.current,
    };

    periodDto.update({_id: req.body.id}, period, (err, data) =>{
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

    periodDto.getAll({}, (err, data) =>{
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


exports.deletePeriod = () =>{

    periodtDto.delete({_id: req.body.id}, (err, data) =>{
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
exports.getByCode = (req, res, next) =>{

    studentDto.getByCode({code: req.params.code}, (err, data) =>{
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

