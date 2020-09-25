import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CardBrowser from "./CardBrowser";
import CardEditor from "./CardEditor";
import Navbar from "../navbar/Navbar";

export default function CardsRouter() {
  return (
    <Switch>
      <Route
        path={useRouteMatch().path}
        exact
        render={() => (
          <div>
            <Navbar />
            <CardBrowser />
          </div>
        )}
      />
      <Route path={`${useRouteMatch().path}/:id`} component={CardEditor} />
    </Switch>
  );
}
