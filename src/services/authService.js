const generateJWT = require('../utils/generateJWT');
const User = require('../models/user.models');
const crypt = require('bcryptjs');

const authService = async (req) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    console.log(user);

    if (!user) {
        return {status: 401, message: "Usuario o contraseña invalidos"};
    }

    const validatePassword = crypt.compareSync(password, user.password);

    if (!validatePassword) {
        return {status: 401, message: "Usuario o contraseña invalidos"};
    }

    const token = generateJWT(email);

    console.log(token);

    return token;
}

module.exports = authService;