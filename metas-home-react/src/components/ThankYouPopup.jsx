import React, { useEffect } from "react";
import "../index.css"; // Make sure to create this CSS file

const ThankYouPopup = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 60000); // Auto-close after 60 sec
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>&#127881;Thank You!</h2>
        <p>Your request has been submitted successfully.<br></br>
        We will get back to you within 24 hours.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ThankYouPopup;
