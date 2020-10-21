import React from "react";
import Choice from "../choice/Choice";
import CardCreator from "./CardCreator";
import Navbar from "../navbar/Navbar";
import { Route, useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Create() {
  const helmetContent =
    "Browse free and available patterns There are many various cards which you can browse and choose whichever one pleases and suits your needs. Every card is free for everyone! If we think your card is standing out we may add it to our global collection! Create your own card from scratch If you do not want to use a pattern you can design your card by yourself and show your creativity. Sky is the limit!";
  return (
    <div className="create">
      <Route
        exact
        path={`${useRouteMatch().path}`}
        render={() => (
          <div>
            <Helmet>
              <title>Bnn Card Maker - Create</title>
              <meta name="description" content={helmetContent} />
            </Helmet>
            <Navbar />
            <Choice />
          </div>
        )}
      />
      <Route path={`${useRouteMatch().path}/editor`} component={CardCreator} />
    </div>
  );
}
