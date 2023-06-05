import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_EXERCISES } from '../utils/queries';
import weights from '../images/weights.jpg';
import loadingImage from '../images/loading.gif';

const ExerciseList = () => {
    const [muscle, setMuscle] = useState('');
    const [searchExercises, { loading, error, data }] = useLazyQuery(GET_EXERCISES);

    const handleInputChange = (e) => {
        setMuscle(e.target.value);
    };


    const handleSearch = () => {
        searchExercises({
            variables: { muscle },
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const exercises = data?.getExercises || [];

    return (
        <div className="exerciseBg" style={{ backgroundImage: `url(${weights})` }}>
            <div className="exerciseContainer">
                <div>
                    <h1 className="exerciseHeader">Recommended Exercises</h1>
                    <div>
                        <input className="exercise-input"
                            type="text"
                            placeholder="Enter a Muscle Group"
                            value={muscle}
                            onChange={handleInputChange}
                        />
                        <button className="exercise-btn" onClick={handleSearch}>Search</button>
                    </div>
                    <div className="exerciseList">
                        {exercises.length > 0 ? (
                            exercises.slice(0, 8).map((exercise) => (
                                <div className="exercise-card" key={exercise.name}>
                                    <h3 className="exercise-title">{exercise.name}</h3>
                                    <p className="exercise-type">Type: {exercise.type}</p>
                                    <p className="exercise-muscle">Muscle: {exercise.muscle}</p>
                                    <p className="exercise-equip">Equipment: {exercise.equipment}</p>
                                    <p className="exercise-diff">Difficulty: {exercise.difficulty}</p>
                                    <p className="exercise-instructions">Instructions: {exercise.instructions}</p>
                                </div>

                            ))
                        ) : (
                            <img src={loadingImage} alt="anime squat" className="loadingExercise" />
                        )}

                    </div>
                </div>
            </div>
        </div >
    );
};

export default ExerciseList;
