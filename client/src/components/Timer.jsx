import React, { useState, useEffect } from "react";

const TimerPopup = (props) => {
  const [timerVisible, setTimerVisible] = useState(false); // Controls visibility of the timer
  const [timeLeft, setTimeLeft] = useState(0); // Time left in the countdown (in seconds)
  const [isRunning, setIsRunning] = useState(false); // Whether the timer is running

  // Function to start the timer
  const startTimer = (duration) => {
    const seconds = duration * 60;
    setTimeLeft(seconds);
    setIsRunning(true);
    setTimerVisible(true);
  };

  // Effect to handle the countdown logic
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer); // Stop the timer when it reaches zero
      setIsRunning(false);
    }

    return () => clearInterval(timer); // Cleanup on unmount or when timer stops
  }, [isRunning, timeLeft]);

  // Function to close the timer popup
  const closeTimer = () => {
    setTimerVisible(false);
    setTimeLeft(0);
    setIsRunning(false);
  };

  return (
    <div>
      <button
        onClick={() => startTimer(props.breakTime)}
        className="btn btn-primary btn-lg"
      >
        Start Break Timer
      </button>

      {/* Timer Popup */}
      {timerVisible && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            color: "black",
          }}
        >
          <div
            className="popup-content"
            style={{
              textAlign: "center",
              width: "500px",
              height: "400px",
              padding: "40px",
              fontSize: "100px",
            }}
          >
            <h1 style={{ color: "black" }}>Timer</h1>
            <p>{timeLeft}</p>
            <button
              onClick={closeTimer}
              className="btn btn-danger btn-lg"
              style={{
                fontSize: "24px", // Bigger text size
                padding: "0px 40px", // Increased padding for a larger button
                width: "100%", // Button takes up full width
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add some basic styling */}
      <style>{`
        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          color: black;
        }

        .popup-content {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default TimerPopup;
