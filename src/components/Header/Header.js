import React from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { useAuth } from "../Login/useAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const auth = useAuth();
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light fixed-top site-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" width="220" height="70"></img>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="navbar-collapse collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="true" to="/shop">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/review">
                  Order Review
                </Link>
              </li>
              <li className="nav-item">
                {auth.user ? (
                  <Link className="nav-link" to="/login">
                    Sign out
                  </Link>
                ) : (
                  <Link className="nav-link" to="/login">
                    Sign In
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {auth.user && (
                  <span
                    style={{
                      color: "#06C3CC",
                      lineHeight: "40px",
                      fontSize: "20px",
                    }}
                  >
                    {auth.user.name}
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
