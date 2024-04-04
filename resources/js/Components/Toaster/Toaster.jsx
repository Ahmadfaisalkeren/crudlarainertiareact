import React, { useEffect, useState } from "react";
import './Toaster.css';

const Toaster = ({ message, duration, onClose }) => {
  const [animationStyle, setAnimationStyle] = useState({});

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    const animationDuration = (duration / 1000).toFixed(2);
    setAnimationStyle({
      animation: `countdown ${animationDuration}s linear forwards`,
    });

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  const toastStyles = {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.37)",
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div style={toastStyles} className="shadow-md rounded-md p-4 text-blue-600 relative">
        <p>{message}</p>
        <div
          className="h-1 w-full bg-blue-500 absolute bottom-0 left-0"
          style={{
            ...animationStyle,
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Toaster;

