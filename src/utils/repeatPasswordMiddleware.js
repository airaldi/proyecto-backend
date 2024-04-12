const repeatPasswordMiddleware = (req, res, next) => {
    if(req.body.password !== req.body.repeatPassword){
        return res.status(400).json({message: 'Passwords do not match'});
    }
    next();
}

module.exports = repeatPasswordMiddleware;