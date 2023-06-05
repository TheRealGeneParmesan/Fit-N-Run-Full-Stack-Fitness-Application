import React, { useState } from "react";
import strengthBg from "../images/strengthImg.jpg";
import { Container } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_STRENGTH } from "../utils/mutations";

const Strength = () => {
    const [activity, setActivity] = useState('');
    const [reps, setReps] = useState(10);
    const [sets, setSets] = useState(3);
    const [weight, setWeight] = useState(45);
    const [date, setDate] = useState('');
    const [saveStrength, { error }] = useMutation(ADD_STRENGTH);

    const handleActivityChange = (e) => {
        setActivity(e.target.value);
    };

    const handleRepsChange = (e) => {
        setReps(parseInt(e.target.value));
    };

    const handleSetsChange = (e) => {
        setSets(parseInt(e.target.value));
    };

    const handleWeightChange = (e) => {
        setWeight(parseInt(e.target.value));
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleStrengthSubmit = async (e) => {
        e.preventDefault();
        const { data } = await saveStrength({
            variables: {
                input: {
                    name: activity,
                    reps: reps,
                    sets: sets,
                    weight: weight,
                    date: date
                }
            }
        });

        setActivity('');
        setReps('');
        setSets('');
        setWeight('');
        setDate('');
    };

    return (
        <div className="strengthImg" style={{ backgroundImage: `url(${strengthBg})` }}>
            <Container
                className="strengthContainer" >
                <div className="strengthForm">
                    <h1 className="strengthTitle"> Strength Training </h1>
                    <form onSubmit={handleStrengthSubmit}>
                        <div className="form-group label">
                            <label>Activity:</label>
                            <input type="text" className="form-control" placeholder="Bicep Curls" value={activity} onChange={handleActivityChange} />
                        </div>
                        <div className="form-group label">
                            <label>Reps:</label>
                            <input type="number" className="form-control" placeholder="15" value={reps} onChange={handleRepsChange} />
                        </div>
                        <div className="form-group label">
                            <label>Sets:</label>
                            <input type="number" className="form-control" placeholder="3" value={sets} onChange={handleSetsChange} />
                        </div>
                        <div className="form-group label">
                            <label>Weight (Optional):</label>
                            <input type="number" className="form-control" placeholder="45" value={weight} onChange={handleWeightChange} />
                        </div>
                        <div className="form-group label">
                            <label>Date:</label>
                            <input type="text" className="form-control" placeholder="05/27/2023" value={date} onChange={handleDateChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Container>

        </div>
    );
};

export default Strength;


