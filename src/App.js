import React from "react";
import "./scss/style.css";
import Main from "./mainPage/Main";
import Choice from "./choice/Choice";
import Navbar from "./navbar/Navbar";
import Steps from "./steps/Steps";
import Ideas from "./ideas/Ideas";
import Create from "./create/Create";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <div className="App">
              <Main />
              <Choice />
              <Steps />
              <Ideas />
            </div>
          )}
        />
        <Route path="/create" component={Create} />
      </Switch>
    </Router>
  );
}

export default App;
