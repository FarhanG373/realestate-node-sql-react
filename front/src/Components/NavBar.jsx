import React from "react";
import s from "./Components.module.scss";
import Logo from "../Assets/Images/dummy-logo-5b.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  const getToken = JSON.parse(localStorage.getItem("tokenRealEstate"));
  const logOut = () => {
    localStorage.removeItem("tokenRealEstate");
    window.location.reload();
  };
  return (
    <nav className={s.nav}>
      <div className={s.logo}>
        <img src={Logo} alt="" />
      </div>
      <ul className={s.menu}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!getToken ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={logOut}>Log Out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
