import React, { useState } from "react";

const Cardio = () => {
    const [cardio, setCardio] = useState('');
    const [cardioDuration, setCardioDuration] = useState('');
    const [cardioDistance, setCardioDistance] = useState('');

    const handleCardioChange = (e) => {
        setCardio(e.target.value);
    };

    const handleCardioDurationChange = (e) => {
        setCardioDuration(e.target.value);
    };

    const handleCardioDistanceChange = (e) => {
        setCardioDistance(e.target.value);
    };

    const handleCardioSubmit = (e) => {
        e.preventDefault();

        setCardio('');
        setCardioDuration('');
        setCardioDistance('');
    };

    return (
        <div className="cardio">
            <h1>Cardio</h1>
            <form onSubmit={handleCardioSubmit}>
                <div className="form-group">
                    <label>Activity:</label>
                    <input type="text" className="form-control" value={cardio} onChange={handleCardioChange} />
                </div>
                <div className="form-group">
                    <label>Duration:</label>
                    <input type="text" className="form-control" value={cardioDuration} onChange={handleCardioDurationChange} />
                </div>
                <div className="form-group">
                    <label>Distance:</label>
                    <input type="text" className="form-control" value={cardioDistance} onChange={handleCardioDistanceChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Cardio;
