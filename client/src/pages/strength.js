import React, { useState } from "react";
import strengthBg from "../images/strengthImg.jpg";
import { Container } from "react-bootstrap";

const Strength = () => {
    const [activity, setActivity] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weight, setWeight] = useState('');

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

    const handleStrengthSubmit = (e) => {
        e.preventDefault();

        setActivity('');
        setReps('');
        setSets('');
        setWeight('');
    };

    return (
        <div className="strengthImg" style={{ backgroundImage: `url(${strengthBg})` }}>
            <Container
                classname="strengthContainer" >
                <h1 className="strengthTitle"> Strength Training </h1>
                <div className="strengthForm">
                    <form onSubmit={handleStrengthSubmit}>
                        <div className="form-group">
                            <label>Activity:</label>
                            <input type="text" className="form-control" value={activity} onChange={handleActivityChange} />
                        </div>
                        <div className="form-group">
                            <label>Reps:</label>
                            <input type="text" className="form-control" value={reps} onChange={handleRepsChange} />
                        </div>
                        <div className="form-group">
                            <label>Sets:</label>
                            <input type="text" className="form-control" value={sets} onChange={handleSetsChange} />
                        </div>
                        <div className="form-group">
                            <label>Weight:</label>
                            <input type="text" className="form-control" value={weight} onChange={handleWeightChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Container>

        </div>
    );
};

export default Strength;


