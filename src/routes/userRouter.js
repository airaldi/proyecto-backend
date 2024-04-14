const express = require('express');
const { createUserController, getUserbyUsernameController, updateUserController, deleteUserController, getCryptoPriceController } = require('../controller/userController');
const validatorMiddleware = require('../utils/validator');
const {check} = require("express-validator");
const repeatPasswordMiddleware = require('../utils/repeatPasswordMiddleware');
const validateToken = require('../utils/validateToken');
const userRouter = express.Router();

userRouter.get('/saludar', validateToken, (req, res) => {
    res.send('Hola clase pude entrar :)')
})
userRouter.get("/:username", getUserbyUsernameController)
userRouter.post(
    "/", 
    check("email")
        .isEmail()
        .withMessage("Debe ser una direccion de correo electronico valida"),
    check("age")
        .isInt({min: 18})
        .withMessage("Debes ser mayor de edad"),
    check("password")
        .isLength({min: 8, max: 20})
        .withMessage("La contraseña debe tener un minimo de 8 caracteres y un maximo de 20")
        .matches(/\d/)
        .withMessage("La contraseña debe contener al menos un numero"),
    repeatPasswordMiddleware,
    validatorMiddleware, 
    createUserController
);


userRouter.put(
    '/:username', 
    check("email")
        .optional()
        .isEmail()
        .withMessage("Debe ser una direccion de correo electronico valida"),
    check("age")
        .optional()
        .isInt({min: 18})
        .withMessage("Debes ser mayor de edad"),
    check("password")
        .optional()
        .isLength({min: 8, max: 20})
        .withMessage("La contraseña debe tener un minimo de 8 caracteres y un maximo de 20")
        .matches(/\d/)
        .withMessage("La contraseña debe contener al menos un numero"),

    repeatPasswordMiddleware,
    validatorMiddleware, 

    updateUserController 
);

userRouter.delete(
    '/:username', 
    deleteUserController 
);

userRouter.get('/crypto/:username', getCryptoPriceController);

module.exports = userRouter;