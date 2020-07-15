const {check} = require('express-validator');

module.exports = {
    check_login: [
        check('email')
        .notEmpty().withMessage("El campo Email es obligatorio.").bail()
        .isEmail().withMessage("Debe ingresar un email válido."),
        check('password')
        .notEmpty().withMessage("El campo Contraseña es obligatorio.").bail()
        .isLength({min:6}).withMessage("Ingrese una clave válida.")
    ],
    check_register: [
        check('name')
        .notEmpty().withMessage("El campo Nombre es obligatorio.").bail()
        .isString().withMessage("Debe ingresar un nombre válido"),
        
        check('lastName')
        .notEmpty().withMessage("El campo Apellido es obligatorio.").bail()
        .isString().withMessage("Debe ingresar un apellido válido"),

        check('email')
        .notEmpty().withMessage("El campo Email es obligatorio.").bail()
        .isEmail().withMessage("Debe ingresar un email válido"),

        check('password')
        .notEmpty().withMessage("El campo Contraseña es obligatorio.").bail()
        .isLength({min:8}).withMessage("La contraseña debe tener, al menos, 8 caracteres"),

        check('passwordRpt')
        .notEmpty().withMessage("El campo Contraseña es obligatorio.").bail()
        .isLength({min:8}).withMessage("La contraseña debe tener, al menos, 8 caracteres")

    ]
}