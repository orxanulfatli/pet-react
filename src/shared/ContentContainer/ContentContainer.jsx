import React from "react";
import "./ContentContainer.css";

const ContentContainer = ({ children, className }) => {
  return <div className={`container  ${className}`}>{children}</div>;
};

export default ContentContainer;
