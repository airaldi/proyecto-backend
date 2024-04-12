const express = require('express');
const userRouter = require('../routes/userRouter');
const authRouter = require('../routes/authRouter');
const server = express();

server.use(express.json());

server.use('/api/user', userRouter);
server.use('/api/auth', authRouter);

module.exports = server;