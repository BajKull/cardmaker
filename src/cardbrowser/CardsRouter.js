import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CardBrowser from "./CardBrowser";
import CardEditor from "./CardEditor";

export default function CardsRouter() {
  return (
    <Switch>
      <Route path={useRouteMatch().path} exact component={CardBrowser} />
      <Route path={`${useRouteMatch().path}/:id`} component={CardEditor} />
    </Switch>
  );
}
