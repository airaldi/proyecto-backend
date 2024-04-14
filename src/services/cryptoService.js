const axios = require('axios');

const getCryptoPriceService = async (crypto) => {
    try {
        // Utilizar la API externa para obtener el precio de la criptomoneda
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener el precio de la criptomoneda');
    }
};

module.exports = { getCryptoPriceService };

