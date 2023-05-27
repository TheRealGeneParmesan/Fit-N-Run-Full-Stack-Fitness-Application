const axios = require('axios');

const nutritionData = async (query) => {
    try {
        const response = await axios.get(
            `https://api.nutritionix.com/v1_1/search/${query}?results=0:5&fields=item_name,brand_name,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_protein&appId=2c5cddf1&appKey=df44732763fd77c6a376ce050adaa721`
        );
        return response.data.hits;
    } catch (error) {
        throw new Error('Failed to fetch data from API');
    }
};

module.exports = {
    nutritionData,
};