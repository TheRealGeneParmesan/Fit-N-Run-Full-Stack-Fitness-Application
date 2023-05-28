import React, { useState } from "react";
import { Container } from "react-bootstrap";
import cardioImg from "../images/cardioImg.jpg";

const Cardio = () => {
    const [cardio, setCardio] = useState('');
    const [cardioDuration, setCardioDuration] = useState('');
    const [cardioDistance, setCardioDistance] = useState('');
    const [date, setDate] = useState('');

    const handleCardioChange = (e) => {
        setCardio(e.target.value);
    };

    const handleCardioDurationChange = (e) => {
        setCardioDuration(e.target.value);
    };

    const handleCardioDistanceChange = (e) => {
        setCardioDistance(e.target.value);
    };
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleCardioSubmit = (e) => {
        e.preventDefault();

        setCardio('');
        setCardioDuration('');
        setCardioDistance('');
        setCardioDistance('');
    };

    return (
        <div className="cardioImg" style={{ backgroundImage: `url(${cardioImg})` }}>
            <Container
                classname="cardioContainer">
                <div className='cardioForm'>
                    <h1 className="cardioTitle"> Cardio </h1>
                    <form onSubmit={handleCardioSubmit}>
                        <div className="form-group">
                            <label>Activity:</label>
                            <input type="text" className="form-control" placeholder="Marathon Running" value={cardio} onChange={handleCardioChange} />
                        </div>
                        <div className="form-group">
                            <label>Duration:</label>
                            <input type="text" className="form-control" placeholder="2 Hours" value={cardioDuration} onChange={handleCardioDurationChange} />
                        </div>
                        <div className="form-group">
                            <label>Distance (Miles):</label>
                            <input type="text" className="form-control" placeholder="3" value={cardioDistance} onChange={handleCardioDistanceChange} />
                        </div>
                        <div className="form-group label">
                            <label>Date:</label>
                            <input type="text" className="form-control" placeholder="05/27/2023" value={date} onChange={handleDateChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Container>
        </div >
    );
};

export default Cardio;
