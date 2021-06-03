import React, { useState, useEffect } from "react";
import LoginFormModal from "../Forms/LoginFormModal";
import SignupFormModal from "../Forms/SignUpFormModal";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import LogoutButton from "../../components/auth/LogoutButton";

import "./splash.css";

const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  const handleDemo = async (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    await dispatch(login(email, password));
    // return <Redirect to="/profile" />;
    history.push("/profile");
  };

  let actionButtonLogin;
  let actionButtonSignup;
  let actionButtonDemo;

  if (user) {
    actionButtonLogin = <LogoutButton />;
  } else {
    actionButtonLogin = <LoginFormModal />;
    actionButtonSignup = <SignupFormModal />;
    actionButtonDemo = <button onClick={handleDemo}>Demo</button>;
  }

  return (
    <div className="splash__container">
      <div className="splash__title">Culinary Umami</div>
      <div className="splash__tagline">create, search, and share recipes</div>
      <div className="splash__links">
        <div className="splash__login--link">{actionButtonLogin}</div>
        <div className="splash__signup--link">{actionButtonSignup}</div>
        <div className="splash__demo--link">{actionButtonDemo}</div>
      </div>
    </div>
  );
};

export default SplashPage;
