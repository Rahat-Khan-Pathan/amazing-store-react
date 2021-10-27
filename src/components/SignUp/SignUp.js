import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const {error, emailPassSignup, setError} = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const signup = (e) => {
    e.preventDefault();
    setError('');
    emailPassSignup(email,pass);
  };
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="form-div">
          <form className="my-form" onSubmit={signup}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                onChange={handleEmail}
                required
                placeholder="Enter your email"
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                onChange={handlePass}
                required
                placeholder="Enter your password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
              <p className="text-danger">{error}</p>
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="btn btn-primary d-block m-auto"
            />
          </form>
          <div>
            <p className="mt-4 d-inline-block">Already have an account?</p>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
