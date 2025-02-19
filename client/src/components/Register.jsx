import React, { useState } from "react";
import { createUser } from "../api/userApi";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, password };

    try {
      const newUser = await createUser(userData);
      console.log("User created:", newUser);
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage(error.response.data.message);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      <NavBar nav1="nav1" />
      <div className="container col-xl-10 col-xxl-8 px-4 py-4">
        <div className="row align-items-center g-lg-5 py-5 mb-5">
          <div className="col-lg-7 text-left text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3 ml-3">
              Create. Track. Dominate.
            </h1>
            <p className="col-lg-10 fs-4">
              Unlock your full potential with Sugoi — the app that empowers you
              to design your perfect workout routine. Set custom exercises,
              define your sets, reps, weight, and rest times, and track your
              progress with ease. Whether you're training for strength,
              endurance, or muscle growth, Sugoi adapts to your goals, helping
              you crush every session.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form
              className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
              onSubmit={handleSubmit}
            >
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Create Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
                {errorMessage && <p className="invalidLogin">{errorMessage}</p>}
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
