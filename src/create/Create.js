import React from "react";
import Choice from "../choice/Choice";
import Birthday from "./Birthday";
import { Route, useRouteMatch } from "react-router-dom";

export default function Create() {
  return (
    <div className="create">
      <Route exact path={`${useRouteMatch().path}`} component={Choice} />
      <Route path={`${useRouteMatch().path}/birthday`} component={Birthday} />
    </div>
  );
}
