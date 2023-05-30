// import React, { useState, useEffect } from 'react';

// const Timer = ({ initialDuration, displayedDuration }) => {
//   const [duration, setDuration] = useState(initialDuration);
//   const [minutes, setMinutes] = useState(displayedDuration);
//   const [seconds, setSeconds] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     let intervalId;

//     if (isRunning) {
//       intervalId = setInterval(() => {
//         if (seconds === 0) {
//           if (minutes === 0) {
//             stopTimer();
//             return;
//           }
//           setMinutes((prevMinutes) => prevMinutes - 1);
//           setSeconds(59);
//         } else {
//           setSeconds((prevSeconds) => prevSeconds - 1);
//         }
//       }, 1000);
//     }

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [isRunning, minutes, seconds]);

//   const startTimer = () => {
//     setIsRunning(true);
//   };

//   const stopTimer = () => {
//     setIsRunning(false);
//   };

//   const resetTimer = () => {
//     setMinutes(displayedDuration);
//     setSeconds(0);
//     setIsRunning(false);
//   };

//   const handleDurationChange = (e) => {
//     const { value } = e.target;
//     const parsedValue = parseInt(value) || 0;
//     setDuration(parsedValue);
//     setMinutes(parsedValue);
//   };

//   return (
//     <div>
//       <h2>
//         {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
//       </h2>
//       {displayedDuration !== null && (
//         <input type="number" value={duration} onChange={handleDurationChange} />
//       )}
//       <button onClick={startTimer}>Start</button>
//       <button onClick={stopTimer}>Stop</button>
//       <button onClick={resetTimer}>Reset</button>
//     </div>
//   );
// };

// const Timers = () => {
//   return (
//     <div>
//       <div>
//         <h3>Timer 1 (25 minutes)</h3>
//         <Timer initialDuration={25} displayedDuration={null} />
//       </div>
//       <div>
//         <h3>Timer 2 (15 minutes)</h3>
//         <Timer initialDuration={15} displayedDuration={null} />
//       </div>
//       <div>
//         <h3>Timer 3 (10 minutes)</h3>
//         <Timer initialDuration={10} displayedDuration={null} />
//       </div>
//       <div>
//         <h3>Timer 4 (5 minutes)</h3>
//         <Timer initialDuration={5} displayedDuration={null} />
//       </div>
//     </div>
//   );
// };

// export default Timer;
