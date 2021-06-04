import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import LogoutButton from "../auth/LogoutButton";
import SignupFormModal from "../Forms/SignUpFormModal";
import LoginFormModal from "../Forms/LoginFormModal";
import "./menubar.css";

function MenuButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [actionClick, setActionClick] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const stopClose = () => {
    setActionClick(true);
  };

  useEffect(() => {
    if (actionClick) return;
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    // let actionButton = document.querySelectorAll(".menu__div")
    // actionButton.addEventListener("click")
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleDemo = async (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    await dispatch(login(email, password));
    // return <Redirect to="/profile" />;
    history.push("/profile");
  };

  const handleHome = (e) => {
    if (user) {
      history.push("/profile");
    } else {
      history.push("/");
    }
  };
  let actionButtonLogin;
  let actionButtonSignup;
  let actionButtonDemo;

  if (user) {
    actionButtonLogin = <LogoutButton />;
  } else {
    actionButtonSignup = <SignupFormModal />;
    actionButtonLogin = <LoginFormModal />;
    actionButtonDemo = <button onClick={handleDemo}>Demo</button>;
  }

  return (
    <nav className="menu">
      <button className="menu__button" onClick={openMenu}>
        <i className="fas fa-bars" />
      </button>
      {showMenu && (
        <div className="menu__div">
          <div className="menu__div--home">
            <button onClick={handleHome}>Home</button>
          </div>
          <div className="menu__div">
            <div className="menu__div--signup" onClick={stopClose}>
              {actionButtonSignup}
            </div>
            <div className="menu__div--login" onClick={stopClose}>
              {actionButtonLogin}
            </div>
            <div className="menu__div--demo" onClick={stopClose}>
              {actionButtonDemo}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default MenuButton;
