import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as CloseIcon } from "../create/icons/close.svg";
import ProfilePicture from "./profile/ProfilePicture";
import BackgroundPicture from "./profile/BackgroundPicture";
import ProfileSettings from "./profile/ProfileSettings";
import AccountRemoval from "./profile/AccountRemoval";

export default function UserProfile() {
  const user = useSelector((state) => state.loginStatus);

  const [error, setError] = useState(null);

  return (
    <div className="profilePanel">
      <div className="profilePanelP">
        <h1>Profile picture</h1>
        <ProfilePicture user={user} setError={setError} />
        <h1>Profile background</h1>
        <BackgroundPicture user={user} setError={setError} />
        <h1>Profile settings</h1>
        <ProfileSettings user={user} setError={setError} />
        <h1>Account removal</h1>
        <AccountRemoval />
        {error && (
          <div className="errorScreen">
            <div className="errorBg" onClick={() => setError(null)} />
            <div className="errorContent">
              <CloseIcon
                className="errorClose"
                onClick={() => setError(null)}
              />
              <p className="error">{error}</p>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
