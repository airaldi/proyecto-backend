const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({error: 'Token no encontrado'})
    }
    try {
        const {email} = jwt.verify(token, process.env.SECRET_KEY)
        if(!email){
            return res.status(401).json({error: 'Token no valido'})
        }
        req.email = email;
        next();
    } catch (error) {
        return res.status(401).json({error: 'Token no valido'})
    }
}

module.exports = validateToken;