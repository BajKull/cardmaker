import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CardBrowser from "./CardBrowser";
import CardEditor from "./CardEditor";
import Navbar from "../navbar/Navbar";
import { Helmet } from "react-helmet";

export default function CardsRouter() {
  const helmetContent =
    "Browse available cards created in Bnn Card Maker, choose, filter, sort them and edit as you wish and share them for free!";
  return (
    <Switch>
      <Route
        path={useRouteMatch().path}
        exact
        render={() => (
          <div>
            <Helmet>
              <title>Bnn Card Maker - Browse cards</title>
              <meta name="description" content={helmetContent} />
            </Helmet>
            <Navbar />
            <CardBrowser />
          </div>
        )}
      />
      <Route path={`${useRouteMatch().path}/:id`} component={CardEditor} />
    </Switch>
  );
}
