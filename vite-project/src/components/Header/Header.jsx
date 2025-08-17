import headerLogo from "../../assets/WTWR-logo.svg";

import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import userImg from "../../assets/user-img.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({ handleAddClick, weatherData, setActiveModal, isLoggedIn }) {
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

      {isLoggedIn && (
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      )}
      <ToggleSwitch />
      <div className="header__user-container">
        {isLoggedIn && currentUser && (
          <Link to="/profile" className="header__link">
            <div className="header__user-info">
              <span className="header__user-name">{currentUser.name}</span>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </Link>
        )}
        {!currentUser && (
          <div className="header__auth-buttons">
            <button
              onClick={() => {
                setActiveModal("register");
              }}
            >
              Sign Up
            </button>

            <button onClick={() => setActiveModal("login")}>Log In</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
