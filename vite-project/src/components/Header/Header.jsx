import headerLogo from "../../assets/WTWR-logo.svg";

import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import userImg from "../../assets/user-img.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
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
          <p className="header__username">Terrence Tegegne</p>
          <img src={userImg} alt="user image" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
