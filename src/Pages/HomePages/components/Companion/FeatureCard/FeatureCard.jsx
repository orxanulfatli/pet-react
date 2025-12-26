import React from "react";
import "./FeatureCard.css";

const FeatureCard = ({ title, subtitle, text, active, onClick }) => {
  return (
    <div className={`feature-card ${active ? "active" : ""}`} onClick={onClick}>
      <p className="feature-card-subtitle">{subtitle}</p>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-text">{text}</p>
    </div>
  );
};

export default FeatureCard;
