import headerLogo from "../../assets/WTWR-logo.svg";

import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import userImg from "../../assets/user-img.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({ handleAddClick, weatherData }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img
            src={headerLogo}
            alt="what to wear logo"
            className="header__logo"
          />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <button
        type="button"
        onClick={handleAddClick}
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <ToggleSwitch />
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          {currentUser ? (
            <div className="header__user-info">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="header__avatar" />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <span>{currentUser.name}</span>
            </div>
          ) : (
            <div>
              <button>Sign Up</button>
              <button>Log In</button>
            </div>
          )}
        </div>
      </Link>
    </header>
  );
}

export default Header;
