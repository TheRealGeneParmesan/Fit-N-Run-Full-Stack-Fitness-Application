import React, { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import { Container } from 'react-bootstrap';

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
            }, 10);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning]);

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
        <Container>
            <div className="stopwatch">
                <h1>Stopwatch</h1>
                <div className="stopwatch-display">
                    <span>{minutes.toString().padStart(2, '0')}:</span>
                    <span>{seconds.toString().padStart(2, '0')}:</span>
                    <span>{milliseconds.toString().padStart(3, '0')}</span>
                </div>
                <div className="stopwatch-buttons">
                    <button onClick={startStopwatch}>Start</button>
                    <button onClick={stopStopwatch}>Stop</button>
                    <button onClick={resetStopwatch}>Reset</button>
                </div>
            </div>

            <div className="timer-container">
                <h2>Timer</h2>
                <Timer initialDuration={0} displayedDuration={null} />
            </div>
        </Container>
    );
};

export default Stopwatch;