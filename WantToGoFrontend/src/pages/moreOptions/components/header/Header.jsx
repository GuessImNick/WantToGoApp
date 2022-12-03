import React from 'react';
import './Header.css';

const Header = ({user}) => {

  const welcomeMessage = () => {
    const time = new Date().toTimeString();
    if(parseInt(time.slice(0, 2)) < 12) {
      return "GOOD MORNING"
    } else if (parseInt(time.slice(0, 2)) > 12) {
      return "GOOD EVENING"
    } else {
      return "WELCOME";
    }
  };

  return (
    <header className="options-header">
    <div className="options-welcome-name">
        <div className="options-initials"><p>{user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}</p></div>
        <h2>{welcomeMessage()} {user.firstName.toUpperCase()}</h2>
    </div>
  </header>
  )
}

export default Header