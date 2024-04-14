const {Schema, model} = require('mongoose');

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    company: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    crypto: {
        type: String
    }
})

const User = model('User', userSchema);

module.exports = User;