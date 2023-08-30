import React from 'react';
import "./Button.css";

const Button = ({ value, onClick }) => {
  let btnClass = "";

  if (["MS", "MC", "MR", "M+", "M-"].includes(value)) {
    btnClass = "memory";
  } else if (["AC", "C"].includes(value)) {
    btnClass = "clear";
  } else if (typeof value === "number") {
    btnClass = "number";
  } else if (["+", "-", "x", "÷", "%", "√"].includes(value)) {
    btnClass = "operator";
  } else if (["="].includes(value)) {
    btnClass = "equals";
  } else if ([".", "+/-"].includes(value)){
    btnClass = "special";
  } else {
    btnClass = "empty";
  }

  return (
    <button className={btnClass} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;