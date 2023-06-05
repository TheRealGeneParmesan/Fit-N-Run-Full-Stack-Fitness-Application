import React, { useState } from "react";
import cardioImg from "../images/cardioImg.jpg";
import { Container } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_CARDIO } from "../utils/mutations";


const Cardio = () => {
    const [cardio, setCardio] = useState('');
    const [cardioDuration, setCardioDuration] = useState(0);
    const [cardioDistance, setCardioDistance] = useState(0);
    const [date, setDate] = useState('');
    const [saveCardio, { error, data }] = useMutation(ADD_CARDIO);

    const handleCardioChange = (e) => {
        setCardio(e.target.value);
    };

    const handleCardioDurationChange = (e) => {
        setCardioDuration(parseInt(e.target.value));
    };

    const handleCardioDistanceChange = (e) => {
        setCardioDistance(parseInt(e.target.value));
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleCardioSubmit = async (e) => {
        e.preventDefault();
        const { data } = await saveCardio({
            variables: {
                input: {
                    name: cardio,
                    distance: cardioDistance,
                    duration: cardioDuration,
                    date: date
                }
            }
        });

        setCardio('');
        setCardioDuration('');
        setCardioDistance('');
        setDate('');
    };

    return (
        <div className="cardioImg" style={{ backgroundImage: `url(${cardioImg})` }}>
            <Container
                className="cardioContainer">
                <div className='cardioForm'>
                    <h1 className="cardioTitle"> Cardio </h1>
                    <form onSubmit={handleCardioSubmit}>
                        <div className="form-group">
                            <label>Activity:</label>
                            <input type="text" className="form-control" placeholder="Hiking" value={cardio} onChange={handleCardioChange} />
                        </div>
                        <div className="form-group">
                            <label>Duration (Minutes):</label>
                            <input type="number" className="form-control" placeholder="30" value={cardioDuration} onChange={handleCardioDurationChange} />
                        </div>
                        <div className="form-group">
                            <label>Distance (Miles):</label>
                            <input type="number" className="form-control" placeholder="3" value={cardioDistance} onChange={handleCardioDistanceChange} />
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
