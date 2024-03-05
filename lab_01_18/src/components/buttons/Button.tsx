import React from "react";
import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isActive, className, ...props }) => {
  return (
    <button {...props} className={`button ${isActive ? "active" : ""} ${className}`}>
      {children}
    </button>
  );
};
