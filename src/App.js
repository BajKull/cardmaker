import React from "react";
import "./scss/style.css";
import Main from "./mainPage/Main";
import Choice from "./choice/Choice";
import Navbar from "./navbar/Navbar";
import Steps from "./steps/Steps";
import Ideas from "./ideas/Ideas";
import Create from "./create/Create";
import Login from "./account/Login";
import Register from "./account/Register";
import CardsRouter from "./cardbrowser/CardsRouter";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const loginScreen = useSelector((state) => state.loginScreen);

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
        <Route path="/signup" component={Register} />
        <Route path="/create" component={Create} />
        <Route path="/cards" component={CardsRouter} />
      </Switch>
    </Router>
  );
}

export default App;
