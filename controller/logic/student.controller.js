/**Dto
 *          me permite recibir informacion que gener require y poder enviarla a alas funciones de dto  que se construyeron  */ 

const studentDto = require("../../model/dto/student.dto");
const userDto = require("../../model/dto/user.dto");
const config = require("config");

/**Helper */

const helper = require("../helpers/general.helper")
const notHelper = require("../helpers/notification.helper")

exports.createStudent = (req, res, next) => {
    let std = {
        code: req.body.code,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        career: req.body.career
    };
    studentDto.create(std, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        let r = config.get("roles").student;
        let user = {
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.code,
            password: helper.encryptedPassword(req.body.password),
            role: r
        };
        userDto.create(user, (err, u) => {
            console.log(user);
            if (err) {
                console.log(err);
                studentDto.delete({ _id: data._id }, (e, data) => {
                    if (e) {
                        return res.status(400).json(
                            {
                                error: err
                            }
                        );

                    } res.status(204).json()
                });
                return res.status(400).json(
                    {
                        error: err
                    }
                );

            }
            notHelper.sendSMS(std.phone, user);
        });
        res.status(201).json(
            {
                info: data
            }
        )
    });
};


exports.updateStudent = (req, res, next) => {
    let std = {
        code: req.body.code,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        career: req.body.career
    };
    studentDto.update({ _id: req.body.id }, std, (err, data) => {
        console.log(data)
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        if (req.body.oldcode != undefined) {
            let r = config.get("roles").student;
            let user = {
                name: req.body.name,
                lastname: req.body.lastname,
                username: req.body.code,
                password: helper.encryptedPassword(req.body.password),
                role: r
            };
            console.log(req);
            userDto.update({ username: req.body.oldcode }, user, (err, u) => {
                if (err) {
                    return res.status(400).json(
                        {
                            error: err
                        }
                    );
                }
                notHelper.sendSMS(std.phone, user);
            });
        } else {
            res.status(400).json(
                {
                    info: "El numero de documento no puede estar vac??o!"
                }
            );
        }
        res.status(201).json(
            {
                info: data
            }
        )
    });
};


exports.getAll = (req, res, next) => {
    studentDto.getAll({}, (err, data) => {
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



exports.getByCode = (req, res, next) => {
    studentDto.getByCode({ code: req.params.code }, (err, data) => {
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


exports.deleteStudent = () => {
    studentDto.delete({ _id: req.body.id }, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        userDto.delete({username:data.code},(err,data)=>{
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
                info:"El estudiante ha sido borrado",
                data:data
            }
        )
    });
};