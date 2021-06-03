import React, { useState, useEffect } from "react";
import LoginFormModal from "../Forms/LoginFormModal";
import SignupFormModal from "../Forms/SignUpFormModal";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./splash.css";

const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDemo = (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    dispatch(login(email, password));
    history.push("/users");
  };

  return (
    <div className="splash__container">
      <div className="splash__title">Culinary Umami</div>
      <div className="splash__tagline">create, search, and share recipes</div>
      <div className="splash__links">
        <div className="splash__login--link">
          <LoginFormModal />
        </div>
        <div className="splash__signup--link">
          <SignupFormModal />
        </div>
        <div className="splash__demo--link">
          <button onClick={handleDemo}>Demo</button>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
