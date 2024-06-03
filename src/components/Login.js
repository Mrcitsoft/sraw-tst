import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import FacebookLogin from "react-facebook-login";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn, facebookSignIn, anonymousSignIn } = useUserAuth(); // Add anonymousSignIn
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const responseFacebook = async (response) => {
    try {
      console.log(response);
      await facebookSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      await anonymousSignIn();
      // Handle post-sign-in actions if needed
      navigate("/home"); // Redirect to home page after anonymous sign-in
    } catch (error) {
      console.error("Anonymous sign-in error:", error);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">SRAW Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        <p></p>
        <div>
          <FacebookLogin
            appId="431798766447406" 
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="fb-btn"
            icon="fa-facebook"
            textButton="Login with Facebook"
          />
        </div>
        <p></p>
        <div>
          <Button variant="secondary" onClick={handleAnonymousSignIn}>
            Login as a Anonymous
          </Button>
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;
