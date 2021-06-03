import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/Forms/LoginFormModal";
import SignUpForm from "./components/auth/SignUpForm";
import Navigation from "./components/NavBar/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/User/UsersList";
import User from "./components/User/User";
import { authenticate } from "./store/session";
import SingleRecipePage from "./components/SingleRecipePage";
import SplashPage from "./components/SplashPage";

function App() {
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <Navigation loaded={loaded} /> */}
      <Switch>
        <Route path="/splash" exact={true}>
          <SplashPage />
        </Route>
        {/* <Route path="/login" exact={true}>
          <LoginForm />
        </Route> */}
        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>
        {/* <Route path="/recipes" exact={true}>
          <SingleRecipePage />
        </Route> */}
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
