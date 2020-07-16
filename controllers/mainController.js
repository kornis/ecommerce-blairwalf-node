const DB = require('../database/models');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { users } = DB;
module.exports = {
    login: (req, res) => {
        return res.render('main/login');
    },
    authenticate: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('main/login', {
                errors: errors.mapped(),
                old: req.body
            });
        } 
        else {
            let email = req.body.email;
            let password = req.body.password;
            users.findOne({
                    where: {
                        email: email
                    }
                })
                .then(result => {
                    if (result) {
                        if (bcrypt.compareSync(password, result.password)) {
                            let user = {
                                email: result.email,
                                name: result.name,
                                lastName: result.lastName
                            }
                            req.session.user_data = user;
                            return res.redirect('/');
                        } 
                        else {
                            return res.render(
                                'main/login', {
                                    messageError: "Email y/o contraseña inválido/a."
                                }
                            );
                        }
                    } else {
                        return res.render(
                            'main/login', {
                                messageError: "Email y/o contraseña inválido/a."
                            }
                        );
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }

    },

    createUser: (req, res) => {
        return res.render('main/register');
    },
    saveUser: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('main/register', {
                errors: errors.mapped(),
                old: req.body
            });
        } else {
            if (req.body.password !== req.body.passwordRpt) {
                return res.render('main/register', {
                    errors: {
                        passwordRpt: "La contraseña no coincide."
                    },
                    old: req.body
                })
            } else {
                users
                    .findOne({
                        where: {
                            email: req.body.email
                        }
                    })
                    .then(result => {
                        if (result) {
                            return res.render('main/register', {
                                messageError: "Email ya registrado."
                            });
                        } else {
                            delete req.body.passwordRpt;
                            req.body.password = bcrypt.hashSync(req.body.password, 12);
                            users.create({
                                    ...req.body
                                })
                                .then(result => {
                                    user = {
                                        id: result.id,
                                        name: result.name,
                                        email: result.email
                                    }
                                    req.session.user_data = user;
                                    return res.redirect('/perfil');
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
}