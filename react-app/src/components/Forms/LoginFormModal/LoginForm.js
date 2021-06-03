import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../../store/session";
import "./loginform.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
    history.push("/profile");
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="login__form">
      <form onSubmit={onLogin}>
        <fieldset>
          <legend>Login</legend>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            <label className="login__form--label" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div id="login__button--div">
            <button type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginForm;
