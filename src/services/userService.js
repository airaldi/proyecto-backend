const User = require("../models/user.models");
const crypt = require('bcryptjs');

const getUserbyUsernameService = async (req, res) => {
    try {
        const {username} = req.params;

        const user = await User.findOne({username});

        const {age, email, crypto} = user;

        if(!user){
            return {error: "Usuario no encontrado", status: 404};
        }

        return {
            username,
            age,
            email,
            crypto
        }
    } catch (error) {
        return {status: 404, message: "Ocurrio un error"};
    }
}

const createUserService = async (req, res) => {
    try {
        const newUser = req.body;

        const encodedPassword = crypt.hashSync(newUser.password, 10);

        const newUserEncoded = new User ({
            username: newUser.username,
            email: newUser.email,
            password: encodedPassword,
            age: newUser.age,
            crypto: newUser.crypto
        });

        await newUserEncoded.save();
        return {message: "Usuario creado exitosamente"}
    } catch (error) {
        return {stats: 400, message: "Ocurrio un error"}
    }
}

const updateUserService = async (username, updatedData) => {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return { error: "Usuario no encontrado", status: 404 };
        }

        if (updatedData.password) {
            updatedData.password = crypt.hashSync(updatedData.password, 10);
        }

        Object.assign(user, updatedData);

        await user.save();

        return user;
    } catch (error) {
        return { status: 400, message: "Ocurrió un error" };
    }
}

const deleteUserService = async (username) => {
    try {
        const user = await User.findOneAndDelete({ username });

        if (!user) {
            return { error: "Usuario no encontrado", status: 404 };
        }

        return user;
    } catch (error) {
        return { status: 400, message: "Ocurrió un error" };
    }
}

module.exports = {createUserService, getUserbyUsernameService, updateUserService, deleteUserService};