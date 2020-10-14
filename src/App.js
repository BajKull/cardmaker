import React from "react";
import "./scss/style.css";
import Main from "./mainPage/Main";
import Choice from "./choice/Choice";
import Navbar from "./navbar/Navbar";
import Steps from "./steps/Steps";
import Ideas from "./ideas/Ideas";
import Create from "./create/Create";
import About from "./about/About";
import Profile from "./profile/Profile";
import Login from "./account/Login";
import Register from "./account/Register";
import CardsRouter from "./cardbrowser/CardsRouter";
import NotFound from "./notfound/NotFound";
import userAuth from "./firebase/UserAuth";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const loginScreen = useSelector((state) => state.loginScreen);
  userAuth();

  return (
    <Router>
      {loginScreen === "signin" && <Login />}
      {loginScreen === "signup" && <Register />}
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <div className="App">
              <Navbar />
              <Main />
              <Choice />
              <Steps />
              <Ideas />
            </div>
          )}
        />
        <Route
          path="/about"
          render={() => (
            <div>
              <Navbar />
              <About />
            </div>
          )}
        />
        <Route
          path="/profile"
          render={() => (
            <div>
              <Navbar />
              <Profile />
            </div>
          )}
        />
        <Route path="/signup" component={Register} />
        <Route path="/signin" component={Login} />
        <Route path="/create" component={Create} />
        <Route path="/cards" component={CardsRouter} />
        <Route path="/" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
