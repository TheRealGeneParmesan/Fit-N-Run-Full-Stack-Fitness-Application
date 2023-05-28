import React, { useState } from "react";
import strengthBg from "../images/strengthImg.jpg";
import { Container } from "react-bootstrap";

const Strength = () => {
    const [activity, setActivity] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');

    const handleActivityChange = (e) => {
        setActivity(e.target.value);
    };

    const handleRepsChange = (e) => {
        setReps(e.target.value);
    };

    const handleSetsChange = (e) => {
        setSets(e.target.value);
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleStrengthSubmit = (e) => {
        e.preventDefault();


        setActivity('');
        setReps('');
        setSets('');
        setWeight('');
        setDate('');
    };

    return (
        <div className="strengthImg" style={{ backgroundImage: `url(${strengthBg})` }}>
            <Container
                classname="strengthContainer" >
                <div className="strengthForm">
                    <h1 className="strengthTitle"> Strength Training </h1>
                    <form onSubmit={handleStrengthSubmit}>
                        <div className="form-group label">
                            <label>Activity:</label>
                            <input type="text" className="form-control" value={activity} onChange={handleActivityChange} />
                        </div>
                        <div className="form-group label">
                            <label>Reps:</label>
                            <input type="text" className="form-control" value={reps} onChange={handleRepsChange} />
                        </div>
                        <div className="form-group label">
                            <label>Sets:</label>
                            <input type="text" className="form-control" value={sets} onChange={handleSetsChange} />
                        </div>
                        <div className="form-group label">
                            <label>Weight:</label>
                            <input type="text" className="form-control" value={weight} onChange={handleWeightChange} />
                        </div>
                        <div className="form-group label">
                            <label>Date</label>
                            <input type="text" className="form-control" value={date} onChange={handleDateChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Container>

        </div>
    );
};

export default Strength;


