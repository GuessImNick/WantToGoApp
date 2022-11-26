import React from 'react';
import './Button.css';

const Button = ({type, onclick, text}) => {
  return (
    <button className={`btn ${type}`} onClick={onclick}>{text}</button>
  )
}

export default Button