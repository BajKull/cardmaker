import React from "react";
import Choice from "../choice/Choice";
import CardCreator from "./CardCreator";
import Navbar from "../navbar/Navbar";
import { Route, useRouteMatch } from "react-router-dom";

export default function Create() {
  return (
    <div className="create">
      <Route
        exact
        path={`${useRouteMatch().path}`}
        render={() => (
          <div>
            <Navbar />
            <Choice />
          </div>
        )}
      />
      <Route path={`${useRouteMatch().path}/editor`} component={CardCreator} />
    </div>
  );
}
