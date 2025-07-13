import React from "react";
import { Link } from "react-router";

const Button = ({ className, text, handleClick, to }) => {
    
  return (
    <>
      <Link to={to} onClick={handleClick} className={className || "btn btn-primary"}>
        {text || "Text"}
      </Link>
    </>
  );
};

export default Button;
