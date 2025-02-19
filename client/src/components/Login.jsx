import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import CustomButtons from "./CustomButtons";
import { loginUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //useNavigate to automatically navigate to a page after login
  const navigate = useNavigate();

  //For Login Popup Open and close
  const [show, setShow] = useState(false);

  //For Login using database
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //For Login Popup Open and close
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  // State for error message
  const [errorMessage, setErrorMessage] = useState("");

  //For Login using database
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password };

    try {
      const userLoggedIn = await loginUser(userData);

      console.log(userLoggedIn.user.user_id);
      localStorage.setItem("userId", userLoggedIn.user.user_id);

      navigate("/Home");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setPassword("");
    }
  };

  return (
    <div>
      <Button className="top-0 end-0 m-3" onClick={handleShow}>
        <CustomButtons type="login" />
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="custom-close-button customFont">
          Login
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label className="customFont">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Use Test123 to look around"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3 customFont">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Use Test123 PW to look around"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorMessage && <p className="invalidLogin">{errorMessage}</p>}
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
