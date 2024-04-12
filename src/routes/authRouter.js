const express = require('express');
const validatorMiddleware = require('../utils/validator');
const {check} = require("express-validator");
const authController = require('../controller/authController');
const authRouter = express.Router();

authRouter.post(
    "/login", 
    check(
        "email",
        "Email no corresponde a una direccion de correo electronico valida "
        ).isEmail(),
    check("password", "La contraseña es obligatoria")
        .isLength({min: 8, max: 20})
        .withMessage("La contraseña debe tener al menos 8 caracteres y no mas de 20"),
    validatorMiddleware,
    authController);

module.exports = authRouter;