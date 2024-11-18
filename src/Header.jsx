import React, { useState, useEffect } from "react";

function Header() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [promoMessage, setPromoMessage] = useState("10% off all Monsters with code 10OFF");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          setPromoMessage("The 10% off promotion has ended.");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <header  style={{ marginTop: '55px' }}  className="bg-primary text-white text-center">
      <div className="alert alert-info mt-4">
        <strong>{promoMessage}</strong> {timeLeft > 0 ? `Time left: ${formatTime(timeLeft)}` : ""}
      </div>
    </header>
  );
}

export default Header;
