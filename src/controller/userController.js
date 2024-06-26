const {createUserService, getUserbyUsernameService , updateUserService, deleteUserService}= require("../services/userService");
const { getCryptoPriceService } = require("../services/cryptoService");

const validateStatus = async (res, user, status) => {
    if(user.status === status) 
        return await res.status(status).json(user);
}

const getUserbyUsernameController = async (req, res) => {
    const user = await getUserbyUsernameService(req);
    validateStatus(res, user, 400)
    res.status(200).json(user);
}

const createUserController = async (req, res) => {
    const user = await createUserService(req);
    validateStatus(res, user, 400)
    res.status(201).json(user);
}

const updateUserController = async (req, res) => {
    try {
        const username = req.params.username; 
        const updatedUser = await updateUserService(username, req.body); 
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteUserController = async (req, res) => {
    try {
        const username = req.params.username; 
        const deletedUser = await deleteUserService(username); 
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getCryptoPriceController = async (req, res) => {
    try {
        const { username } = req.params;
        
        // Obtener el usuario
        const user = await getUserbyUsernameService(req, res);
        
        if (user.error) {
            return res.status(user.status).json(user);
        }
        
        // Obtener el campo `crypto` del usuario
        const crypto = user.crypto;

        if (!crypto) {
            return res.status(404).json({ error: "El usuario no tiene criptomoneda asociada" });
        }

        // Obtener el precio de la criptomoneda
        const price = await getCryptoPriceService(crypto);
        
        res.status(200).json({ crypto, price });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

console.log(typeof getCryptoPriceService);

module.exports = {createUserController, getUserbyUsernameController,updateUserController,deleteUserController, getCryptoPriceController};