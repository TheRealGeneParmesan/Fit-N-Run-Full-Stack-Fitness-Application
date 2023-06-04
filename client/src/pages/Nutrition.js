import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_EXERCISES } from '../utils/queries';

const ExerciseList = () => {
    const [muscle, setMuscle] = useState('');
    const [searchExercises, { loading, error, data }] = useLazyQuery(GET_EXERCISES, {
        variables: { muscle },
    });

    const handleInputChange = (e) => {
        setMuscle(e.target.value);
    };

    const handleSearch = () => {
        searchExercises();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const exercises = data?.getExercises || [];

    return (
        <div>
            <h1>Recommended Exercises</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a muscle group"
                    value={muscle}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {exercises.length > 0 ? (
                exercises.map((exercise) => (
                    <div key={exercise.name}>
                        <h3>{exercise.name}</h3>
                        <p>Type: {exercise.type}</p>
                        <p>Muscle: {exercise.muscle}</p>
                        <p>Equipment: {exercise.equipment}</p>
                        <p>Difficulty: {exercise.difficulty}</p>
                        <p>Instructions: {exercise.instructions}</p>
                    </div>
                ))
            ) : (
                <p>Pump, Pump, Pump it Up!</p>
            )}
        </div>
    );
};

export default ExerciseList;
