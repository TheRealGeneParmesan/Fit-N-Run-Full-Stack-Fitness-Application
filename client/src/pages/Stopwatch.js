import React, { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import cardioImg from '../images/cardioImg.jpg';

const Stopwatch = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);

                if (milliseconds >= 1000) {
                    setSeconds((prevSeconds) => prevSeconds + 1);
                    setMilliseconds(0);
                }

                if (seconds >= 60) {
                    setMinutes((prevMinutes) => prevMinutes + 1);
                    setSeconds(0);
                }
            }, 10);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning, seconds, milliseconds]);

    const startStopwatch = () => {
        setIsRunning(true);
    };

    const stopStopwatch = () => {
        setIsRunning(false);
    };

    const resetStopwatch = () => {
        setMinutes(0);
        setSeconds(0);
        setMilliseconds(0);
        setIsRunning(false);
    };

    return (
        <div className="cardioImg" style={{ backgroundImage: `url(${cardioImg})` }}>
            <div className="stopwatch">
                <div className="stopwatch-container">
                    <h1 className="stopwatch-title">Stopwatch</h1>
                    <div className="stopwatch-display">
                        <span>{minutes.toString().padStart(2, '0')}:</span>
                        <span>{seconds.toString().padStart(2, '0')}{milliseconds >= 1000 ? '' : ':' + Math.floor(milliseconds / 10).toString().padStart(2, '0')}</span>
                    </div>
                    <div className="stopwatch-buttons">
                        <button onClick={startStopwatch}>Start</button>
                        <button onClick={stopStopwatch}>Stop</button>
                        <button onClick={resetStopwatch}>Reset</button>
                    </div>
                    <Timer />
                </div>
            </div>
        </div>
    );
};

export default Stopwatch;
