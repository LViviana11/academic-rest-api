/**Dto
 *          me permite recibir informacion que gener require y poder enviarla a alas funciones de dto  que se construyeron  */

const teacherDto = require("../../model/dto/teacher.dto");
const userDto = require("../../model/dto/user.dto");
const config = require("config");

/**Helper */

const helper = require("../helpers/general.helper")
const notHelper = require("../helpers/notification.helper")

exports.createTeacher = (req, res, next) => {
    let teacher = {
        document: req.body.document,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        office: req.body.office,
        department: req.body.department
    };
    teacherDto.create(teacher, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        let r = config.get("roles").teacher;
        let user = {
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.document,
            password: helper.encryptedPassword(req.body.password),
            role: r
        };
        userDto.create(user, (err, u) => {
            if (err) {
                teacherDto.delete({ _id: data._id }, (err, data) => {
                    if (err) {
                        return res.status(400).json(
                            {
                                error: err
                            }
                        );
                    }
                    res.status(204).json()
                });
                return res.status(400).json(
                    {
                        error: err
                    }
                );
            }
            notHelper.sendSMS(teacher.phone, user);
        });
        res.status(201).json(
            {
                info: data
            }
        )
    });
};

exports.updateTeacher = (req, res, next) => {
    let teacher = {
        document: req.body.document,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        office: req.body.office,
        department: req.body.department
    };
    console.log(teacher)
    userDto.getByCode({ username: req.body.olddocument }, (err, data) => {
        console.log(err);
        console.log(data.length==0);
        
        if (err||data.length==0) {
            console.log(err);
            console.log(data);
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        teacherDto.update({ _id: req.body.id }, teacher, (err, data) => {
       
            if (err) {
                return res.status(400).json(
                    {
                        error: err
                    }
                );
            }
            
            if (req.body.olddocument != undefined) {
                let r = config.get("roles").teacher;
                let user = {
                    name: req.body.name,
                    lastname: req.body.lastname,
                    username: req.body.document,
                    password: helper.encryptedPassword(req.body.password),
                    role: r
                };
                
                userDto.update({ username: req.body.olddocument }, user, (err, u) => {
                    console.log(err)
                    if (err) {
                        return res.status(400).json(
                            {
                                error: err
                            }
                        );
                    }
                    notHelper.sendSMS(teacher.phone, user);
                });
            } else {
                return res.status(400).json(
                    {
                        info: "El numero de documento no puede estar vacío!"
                    }
                );
            }
            res.status(201).json(
                {
                    info: data
                }
            )
        });
    });
    
};


exports.getAll = (req, res, next) => {
    teacherDto.getAll({}, (err, data) => {
        if (err) {
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
        )
    });
};

exports.getByDocument = (req, res, next) => {
    teacherDto.getByDocument({ document: req.params.document }, (err, data) => {
        if (err) {
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
        )
    });
};


exports.deleteTeacher = (req,res,next) => {
    teacherDto.delete({ _id: req.body.id }, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        userDto.delete({username:data.document},(err,data)=>{
            if (err) {
                return res.status(400).json(
                    {
                        error:err
                    }
                )
            }
        });
        res.status(200).json(
            {
                info:"El profesor ha sido borrado",
                data:data
            }
        )
    });
};

