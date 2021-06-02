import { NavLink, useHistory } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import login from "../../store/session";
import MenuButton from "../MenuButton";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  //demo login
  const loginDemo = (e) => {
    e.preventDefault();
    let username = "Demo";
    let password = "password";
    dispatch(login({ username, password }));
    history.push("/profile");
  };

  let sessionNav;
  let homeNav;

  if (sessionUser) {
    sessionNav = <MenuButton user={sessionUser} />;
    homeNav = (
      <NavLink className="nav__bar--home" to="/profile">
        Home
      </NavLink>
    );
  } else {
    sessionNav = (
      <div className="nav__bar--buttons">
        {/* <LoginFormModal />
        <SignupFormModal /> */}
        <button onClick={loginDemo}>Demo</button>
      </div>
    );

    homeNav = (
      <NavLink className="nav__bar--home" to="/">
        Home
      </NavLink>
    );
  }

  return (
    <nav className="nav__bar">
      <div>{homeNav}</div>
      <div>
        <NavLink className="nav__bar--recipes" to="/recipes">
          Recipes
        </NavLink>
      </div>
      <div className="nav__bar--title">Culinary Umami</div>
      <div>{isLoaded && sessionNav}</div>
    </nav>
  );
}

export default Navigation;
