import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import logout from "../../store/session";
import { useHistory } from "react-router-dom";
import "./menubutton.css";

function MenuButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <div className="menu__button--container">
      <button className="menu__button--icon" />
      {showMenu && (
        <div className="menu__button--dropdown">
          <div className="menu__button--user">
            <div className="menu__button--username">{user.username}</div>
            <div>
              <img
                className="menu__button--userimg"
                alt="profile-image"
                src={profileimg}
              />
            </div>
          </div>
          <div className="menu__button--logout">
            <button
              className="menu__button--logoutbutton"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuButton;
