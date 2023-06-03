import React, { useState, useEffect } from 'react';
const Timer = () => {
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    let newSeconds = prevTime.seconds - 1;
                    let newMinutes = prevTime.minutes;
                    let newHours = prevTime.hours;

                    if (newSeconds < 0) {
                        newSeconds = 59;
                        newMinutes -= 1;
                    }
                    if (newMinutes < 0) {
                        newMinutes = 59;
                        newHours -= 1;
                    }

                    if (newHours === 0 && newMinutes === 0 && newSeconds === 0) {
                        clearInterval(interval);
                        setIsRunning(false);
                    }

                    return {
                        hours: newHours,
                        minutes: newMinutes,
                        seconds: newSeconds
                    };
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        setIsRunning(false);
    };

    const increaseTime = (unit) => {
        setTime(prevTime => {
            let newTime = { ...prevTime };
            newTime[unit] += 1;
            return newTime;
        });
    };

    const decreaseTime = (unit) => {
        setTime(prevTime => {
            let newTime = { ...prevTime };
            if (newTime[unit] > 0) {
                newTime[unit] -= 1;
            }
            return newTime;
        });
    };

    return (
        <div className="timer-container">
            <h1 className="timer-title"> Timer </h1>
            <div className="clock-face">
                <span className="clock-time">{time.hours.toString().padStart(2, '0')}:{time.minutes.toString().padStart(2, '0')}:{time.seconds.toString().padStart(2, '0')}</span>
            </div>
            <div className="time-controls">
                <div className="time-unit">
                    <button className="time-button" onClick={() => increaseTime('hours')}>
                        <span>&#x25B2;</span>
                    </button>
                    <span className="time">Hours&nbsp;&nbsp;&nbsp;</span>
                    <button className="time-button" onClick={() => decreaseTime('hours')}>
                        <span>&#x25BC;</span>
                    </button>
                </div>
                <div className="time-unit">
                    <button className="time-button" onClick={() => increaseTime('minutes')}>
                        <span>&#x25B2;</span>
                    </button>
                    <span className="time">Minutes</span>
                    <button className="time-button" onClick={() => decreaseTime('minutes')}>
                        <span>&#x25BC;</span>
                    </button>
                </div>
                <div className="time-unit">
                    <button className="time-button" onClick={() => increaseTime('seconds')}>
                        <span>&#x25B2;</span>
                    </button>
                    <span className="time">Seconds</span>
                    <button className="time-button" onClick={() => decreaseTime('seconds')}>
                        <span>&#x25BC;</span>
                    </button>
                </div>
            </div>
            <div className="timer-buttons">
                <button className="start-button" onClick={handleStart}>Start</button>
                <button className="stop-button" onClick={handleStop}>Stop</button>
                <button className="reset-button" onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;
