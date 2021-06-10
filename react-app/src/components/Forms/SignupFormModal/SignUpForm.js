import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./signupform.css";
let emailValidator = require("email-validator");

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image_url, setImageUrl] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [backErrors, setBackErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, image_url));
      if (data.errors) {
        setBackErrors(data.errors);
      }
      history.push("/profile");
    }
  };

  useEffect(() => {
    let errors = {};
    if (username.length < 5) {
      errors.username = "Username must be greater than 5 characters";
    } else if (username.length > 50) {
      errors.username = "Username must be less than 50 characters";
    }
    if (password !== repeatPassword) {
      errors.password = "Passwords must match";
    }
    if (!emailValidator.validate(email)) {
      errors.email = "Please provide a valid email";
    }
    setErrors(errors);
  }, [username, password, repeatPassword, email]);

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }
  console.log(backErrors);
  return (
    <div className="signup__form">
      <form onSubmit={onSignUp}>
        <fieldset>
          <legend>Sign Up</legend>
          {backErrors[0] && (
            <div className="signup__form--error">
              {backErrors[0]} {backErrors[1]}
            </div>
          )}
          <div>
            <label>User Name</label>
            {errors.username && (
              <div className="signup__form--error">{errors.username}</div>
            )}
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label>Email</label>
            {errors.email && (
              <div className="signup__form--error">{errors.email}</div>
            )}
            <input
              type="email"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label>Image Url</label>

            <input
              type="text"
              name="image"
              onChange={updateImageUrl}
              value={image_url}
            ></input>
          </div>
          <div>
            <label>Password</label>
            {errors.password && (
              <div className="signup__form--error">{errors.password}</div>
            )}
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div id="signup__button--div">
            <button type="submit" disabled={Object.keys(errors).length}>
              Sign Up
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpForm;
