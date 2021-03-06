import React from "react";
import LoginFormModal from "../Forms/LoginFormModal";
import SignupFormModal from "../Forms/SignUpFormModal";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LogoutButton from "../../components/auth/LogoutButton";

import "./navbar.css";

const NavBar = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDemo = async (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    await dispatch(login(email, password));
    // return <Redirect to="/profile" />;
    history.push("/profile");
  };

  const handleAdd = (e) => {
    history.push("/addrecipe");
  };

  const handleHome = (e) => {
    if (user) {
      history.push("/profile");
    } else {
      history.push("/");
    }
  };

  const handleSearch = (e) => {
    history.push("/search");
  };
  let actionButtonLogin;
  let actionButtonSignup;
  let actionButtonDemo;

  if (user) {
    actionButtonSignup = <button onClick={handleSearch}>Search</button>;
    actionButtonDemo = <button onClick={handleAdd}>Add Recipe</button>;
    actionButtonLogin = <LogoutButton />;
  } else {
    actionButtonSignup = <SignupFormModal />;
    actionButtonLogin = <LoginFormModal />;
    actionButtonDemo = <button onClick={handleDemo}>Demo</button>;
  }

  return (
    <nav className="nav__bar">
      <div className="nav__div">
        <div className="nav__div--home">
          <button onClick={handleHome}>Home</button>
        </div>
      </div>
      <div className="nav__div">
        <div className="nav__div--signup">{actionButtonSignup}</div>
        <div className="nav__div--demo">{actionButtonDemo}</div>
        <div className="nav__div--login">{actionButtonLogin}</div>
      </div>
    </nav>
  );
};

export default NavBar;
