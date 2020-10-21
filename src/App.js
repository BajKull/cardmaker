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
import { Helmet } from "react-helmet";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const helmetMainContent =
    "Bnn Card Maker is a free online service which allows you to design your own card from scratch or choose a template share it for free or download the image directly to your device! Create your own card. Easy, fast and pretty.";
  const helmetAboutContent =
    "What is Bnn Card Maker? CardMaker is a free online service which allows users to create cards from nothing using built in editor, browse public templates, create your own templates and share them or simply downloading created cards as a file.";
  const helmetProfileContent =
    "Change your profile settings within Bnn Card Maker. Choose profile picture, avatar, background. Change your password. Delete your account. Browse cards that you created and images that you uploaded.";
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
              <Helmet>
                <title>Bnn Card Maker</title>
                <meta name="description" content={helmetMainContent} />
              </Helmet>
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
              <Helmet>
                <title>Bnn Card Maker - About</title>
                <meta name="description" content={helmetAboutContent} />
              </Helmet>
              <Navbar />
              <About />
            </div>
          )}
        />
        <Route
          path="/profile"
          render={() => (
            <div>
              <Helmet>
                <title>Bnn Card Maker - Profile</title>
                <meta name="description" content={helmetProfileContent} />
              </Helmet>
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
