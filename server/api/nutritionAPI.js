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

// I DONT THINK THIS IS GONNA WORK SO I GUESS ILL DO RESTLINK IN FRONTEND INSTEAD OF
// THIS RESTDATASOURCE BS IN THE BACKEND. IM SO TIRED. -Tiff

// const { RESTDataSource } = require("@apollo/datasource-rest");

// // look up nutrition info for any food item
// class NutritionAPI extends RESTDataSource {
//     constructor() {
//         super();
//         this.baseURL = 'https://trackapi.nutritionix.com/v2/natural/';
//     }

//     async getNutrientInfo(query) {
//         return this.post(`nutrients/${query}`, undefined, {
//             headers: {
//                 'x-app-id': '2c5cddf1',
//                 'x-app-key': 'df44732763fd77c6a376ce050adaa721',
//                 'x-remote-user-id': '0',
//                 'Content-Type': 'application/json'
//             }
//         });
//     }

//     async getExerciseInfo(query) {
//         return this.post(`exercise/${query}`, undefined, {
//             headers: {
//                 'x-app-id': '2c5cddf1',
//                 'x-app-key': 'df44732763fd77c6a376ce050adaa721',
//                 'x-remote-user-id': '0',
//                 'Content-Type': 'application/json'
//             }
//         });
//     }
// }

// module.exports = NutritionAPI;