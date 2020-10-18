import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChangeLoginScreen } from "../redux/actions/ChangeLoginScreen";
import UserProfile from "./UserProfile";
import UserCards from "./UserCards";
import UserImages from "./UserImages";
import User from "./User";
import { useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginStatus);
  const path = useRouteMatch().path;

  useEffect(() => {
    console.log(user);
    if (user === "noUser") dispatch(ChangeLoginScreen("signin"));
  }, [dispatch, user]);

  if (user === "noUser") return <Redirect to="/" />;
  else if (user)
    return (
      <div className="profile">
        <div className="profileContent">
          <User />
          <Switch>
            <Route path={path} exact component={UserProfile} />
            <Route path={`${path}/cards`} component={UserCards} />
            <Route path={`${path}/images`} component={UserImages} />
          </Switch>
        </div>
      </div>
    );
  else return null;
}
