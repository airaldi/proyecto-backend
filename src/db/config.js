const mongoose = require('mongoose');
require('dotenv').config();

const DATABASE = process.env.DATABASE_URL || "";

const Connection = async () => {
    try {
        await mongoose.connect(DATABASE);
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.log(error);
    }
}

Connection();