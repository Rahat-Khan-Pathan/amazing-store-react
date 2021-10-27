import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import initializeFirebaseAuthentication from "../../Firebase/firebase.initialize";
import useAuth from "../../hooks/useAuth";
import { useHistory, useLocation } from "react-router";
import "./Login.css";

initializeFirebaseAuthentication();

const Login = () => {
  const { user, error, emailPassLogin, googleLogin, setError } = useAuth();
  const location = useLocation();
  const history = useHistory();
  const redirectUrl = location.state?.from?.pathname || '/shop';
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(()=> {
    if(user.email) {
      history.push(redirectUrl);
    }
  },[user]);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const login = (e) => {
    e.preventDefault();
    setError("");
    emailPassLogin(email, pass);
  };
  const loginWithGmail = () => {
    googleLogin();
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="form-div">
        <form className="my-form" onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={handleEmail}
              required
              placeholder="Enter your email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={handlePass}
              required
              placeholder="Enter your password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
            <p className="text-danger">{error}</p>
          </div>
          <input
            type="submit"
            value="Log In"
            className="btn btn-primary d-block m-auto"
          />
        </form>
        <div>
          <p className="mt-4 d-inline-block">Dont't have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div>
          <p>Or, Login with</p>
          <button className="btn btn-success" onClick={loginWithGmail}>
            Gmail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
