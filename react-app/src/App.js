import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import SplashPage from "./Components/SplashPage";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar";
// import MenuButton from "./components/MenuButton";
import RecipeForm from "./Components/Forms/RecipeForm";

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
