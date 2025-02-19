import React from "react";
import CustomButtons from "./CustomButtons";
import { Link } from "react-router-dom";
import Login from "./Login";
import { logOutUser } from "../api/userApi";

const NavBar = (props) => {
  const renderNavbar = () => {
    if (props.nav1) {
      return (
        <nav className="navbar navbar-dark bg-dark" aria-label="Navbar 1">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <Link className="navbar-brand mx-auto" to="/Home">
              Sugoi
            </Link>

            <Login />
          </div>
        </nav>
      );
    } else {
      const handleLogout = async () => {
        try {
          const logout = await logOutUser();
        } catch (error) {
          console.error(error.message);
        }
      };
      return (
        <nav className="navbar navbar-dark bg-dark" aria-label="Navbar 2">
          <div className="container-fluid">
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample02"
              aria-controls="navbarsExample02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/">
              Sugoi
            </Link>
            <Link to="/" onClick={handleLogout}>
              {<CustomButtons type="logout" />}
            </Link>
            <div className="navbar-collapse collapse" id="navbarsExample02">
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                  <Link className="nav-link" to="/Home">
                    Routine
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Workout History (Coming Soon)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  };

  return <div>{renderNavbar()}</div>;
};

export default NavBar;
