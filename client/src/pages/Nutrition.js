import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_NUTRITION } from '../utils/queries';

const Nutrition = () => {
    const [nutrition, setNutrition] = useState('');
    const [getNutrition, { loading, data }] = useLazyQuery(GET_NUTRITION);

    const searchNutrition = () => {
        getNutrition({ variables: { query: nutrition } });
    };

    const results = data?.nutritionAPI || [];
    console.log(results)

    return (
        <div>
            <h1>Nutrition</h1>
            <input
                type="text"
                value={nutrition}
                onChange={(e) => setNutrition(e.target.value)}
            />

            <button onClick={searchNutrition}>Search</button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {results.map((food, index) => {
                        console.log(food); // Log each food item
                        return (
                            <li key={index}>
                                <h3>{food.food_name}</h3>
                                <p>Serving Quantity: {food.serving_qty}</p>
                                <p>Serving Unit: {food.serving_unit}</p>
                                <p>Serving Weight (grams): {food.serving_weight_grams}</p>
                                <p>Calories: {food.nf_calories}</p>
                                <p>Total Fat: {food.nf_total_fat}</p>
                                <p>Saturated Fat: {food.nf_saturated_fat}</p>
                                <p>Cholesterol: {food.nf_cholesterol}</p>
                                <p>Sodium: {food.nf_sodium}</p>
                                <p>Total Carbohydrate: {food.nf_total_carbohydrate}</p>
                                <p>Dietary Fiber: {food.nf_dietary_fiber}</p>
                                <p>Sugars: {food.nf_sugars}</p>
                                <p>Protein: {food.nf_protein}</p>
                                <p>Potassium: {food.nf_potassium}</p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Nutrition;
