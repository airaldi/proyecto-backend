const {createUserService, getUserbyUsernameService} = require("../services/userService");

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

//const updateUserController = async (req, res) => {
//    const updatedUser = await updateUserService(req);

//    res.json(updatedUser);
//}

//const deleteUserController = async (req, res) => {
//    const deletedUser = await deleteUserService(req);

//    res.json(deletedUser);
//}

module.exports = {createUserController, getUserbyUsernameController};