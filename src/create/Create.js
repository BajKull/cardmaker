import React from "react";
import Choice from "../choice/Choice";
import CardCreator from "./CardCreator";
import { Route, useRouteMatch } from "react-router-dom";

export default function Create() {
  return (
    <div className="create">
      <Route exact path={`${useRouteMatch().path}`} component={Choice} />
      <Route path={`${useRouteMatch().path}/editor`} component={CardCreator} />
    </div>
  );
}
