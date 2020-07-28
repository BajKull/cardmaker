import React from "react";
import "./scss/style.css";
import Main from "./mainPage/Main";
import Choice from "./choice/Choice";
import Navbar from "./navbar/Navbar";
import Steps from "./steps/Steps";
import Ideas from "./ideas/Ideas";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
      <Choice />
      <Steps />
      <Ideas />
    </div>
  );
}

export default App;
