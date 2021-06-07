import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
// import MenuButton from "./components/MenuButton";
import RecipeForm from "./components/Forms/RecipeForm";
import SingleRecipe from "./components/SingleRecipe";
import UpdateRecipeForm from "./components/Forms/UpdateRecipeForm";

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
        <Route path="/recipe/:id">
          <SingleRecipe />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile user={user} />
        </ProtectedRoute>
        <ProtectedRoute path="/addrecipe" exact={true}>
          <RecipeForm user={user} />
        </ProtectedRoute>
        <Route path="/editrecipe/:id" exact={true}>
          <UpdateRecipeForm user={user} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
