import React, { useState } from "react";
import Bg from "./bg.png";
import { useSelector } from "react-redux";
import { ReactComponent as CloseIcon } from "../create/icons/close.svg";
import { ReactComponent as PencilIcon } from "../create/icons/pencil.svg";
import { CSSTransition } from "react-transition-group";
import PicUpload from "./PicUpload";

export default function UserProfile() {
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [passwordPanel, setPasswordPanel] = useState(false);

  const handleProfileProc = () => {
    document.getElementsByClassName("hiddenProfile")[0].click();
  };

  const profileUpload = (event) => {
    const file = event.target.files[0];

    const formats = ["image/jpg", "image/jpeg", "image/png"];

    if (file && formats.includes(file.type)) {
      setProfilePic(file);
      setError(null);
    } else {
      setProfilePic(null);
      setError("Incorrect file format");
    }
  };

  const user = useSelector((state) => state.loginStatus);
  return (
    <div className="profilePanel">
      <div className="profilePanelP">
        <h1>Profile picture</h1>
        <div className="profilePicture profileSection">
          {user.photoURL ? (
            <img src={user.photoURL} alt="" className="profileLogo" />
          ) : (
            <div className="profileLogo">
              <h1>{user.displayName.charAt(0).toUpperCase()} </h1>
            </div>
          )}
          <div className="profileText">
            <button onClick={handleProfileProc}>Change profile picture</button>
            <input
              type="file"
              accept="image/png, image/jpeg, image/png"
              className="hiddenInput hiddenProfile"
              onChange={profileUpload}
            />
            <p>Picture has to be formatted as .jpg, .jpeg or .png</p>
          </div>
          {profilePic && <PicUpload file={profilePic} />}
        </div>
        <h1>Profile background</h1>
        <div className="profileBackground profileSection">
          <img src={Bg} alt="" className="profileBackgroundBg" />
          <div className="profileText">
            <button>Change background</button>
            <input
              type="file"
              accept="image/png, image/jpeg, image/png"
              className="hiddenInput hiddenBackground"
            />
            <p>Picture has to be formatted as .jpg, .jpeg or .png</p>
          </div>
        </div>
        <h1>Profile settings</h1>
        <div className="profileSettings profileSection">
          <div>
            <div className="profileLabel">
              <label className="profileLabel">Display name</label>
              <div className="settingsFlex">
                <input value={user.displayName} readOnly />
                <PencilIcon className="profileEditIcon" />
              </div>
            </div>
            <div className="profileLabel">
              <label className="profileLabel">Email</label>
              <input value={user.email} readOnly />
            </div>
            <div className="profilePassword">
              <button onClick={() => setPasswordPanel(true)}>
                Change password
              </button>
            </div>
          </div>
          <CSSTransition
            in={passwordPanel}
            unmountOnExit
            timeout={250}
            classNames="navUserName"
          >
            <div className="passwordPanel">
              <div
                className="closeContainer"
                onClick={() => setPasswordPanel(false)}
              >
                <CloseIcon className="closeClass" alt="" />
              </div>
              <label className="profileLabel">Current password</label>
              <input />
              <label className="profileLabel">New password</label>
              <input />
              <label className="profileLabel">Confirm new password</label>
              <input />
              <button>Confirm</button>
            </div>
          </CSSTransition>
        </div>
        <h1>Account removal</h1>
        <div className="profileRemoval profileSection">
          <button>Delete account</button>
        </div>
      </div>
    </div>
  );
}
