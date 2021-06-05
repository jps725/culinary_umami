import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "react-app/src/Components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import RecipeForm from "react-app/src/Components/Forms/RecipeForm";
import SplashPage from "react-app/src/Components/SplashPage";
import Profile from "react-app/src/Components/Profile";
import NavBar from "react-app/src/Components/NavBar";

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
      <NavBar user={user} />
      <Switch>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile user={user} />
        </ProtectedRoute>
        <ProtectedRoute path="/addrecipe" exact={true}>
          <RecipeForm user={user} />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
