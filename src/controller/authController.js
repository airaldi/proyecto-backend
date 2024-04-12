const authService = require("../services/authService");

const authController = async (req, res) => {
    
    const login = await authService(req);
    if(!login.status === 401){
        return await res.status(401).json(login);
    }

    res.json({message: "Login success"})
}

module.exports = authController;