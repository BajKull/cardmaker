import React, { useState, useRef } from "react";
import { ReactComponent as CloseIcon } from "../../create/icons/close.svg";
import { ReactComponent as PencilIcon } from "../../create/icons/pencil.svg";
import { CSSTransition } from "react-transition-group";
import { auth, credential } from "../../firebase/Config";

export default function ProfileSettings({ user, setError }) {
  const [displayN, setDisplayN] = useState(user.displayName);
  const [passwordPanel, setPasswordPanel] = useState(false);
  const [verPassword, setVerPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [resetSuccessfull, setResetSuccessfull] = useState(false);

  const nameRef = useRef(null);

  const handleNameChange = () => {
    nameRef.current.disabled = false;
    nameRef.current.focus();
  };

  const handleNameChanged = () => {
    auth.currentUser.updateProfile({ displayName: displayN });
    nameRef.current.disabled = true;
  };

  const changePassword = () => {
    if (newPassword !== newPassword2) setError("Passwords don't match");
    else {
      const email = user.email;
      const newCredential = credential.EmailAuthProvider.credential(
        email,
        verPassword
      );

      auth.currentUser
        .reauthenticateWithCredential(newCredential)
        .then(() =>
          auth.currentUser
            .updatePassword(newPassword)
            .then(() => setResetSuccessfull(true))
            .catch((error) => setError(error.message))
        )
        .catch((error) => setError(error.message));
    }
  };

  return (
    <div className="profileSettings profileSection">
      <div className="profileOverview">
        <div className="profileLabel">
          <label className="profileLabel">Display name</label>
          <div className="settingsFlex">
            <input
              value={displayN}
              onChange={(e) => setDisplayN(e.target.value)}
              onBlur={handleNameChanged}
              ref={nameRef}
              disabled
            />
            <PencilIcon
              className="profileEditIcon"
              onClick={handleNameChange}
            />
          </div>
        </div>
        <div className="profileLabel">
          <label className="profileLabel">Email</label>
          <input value={user.email} disabled />
        </div>

        <button onClick={() => setPasswordPanel(true)}>Change password</button>
      </div>
      <CSSTransition
        in={passwordPanel}
        unmountOnExit
        timeout={250}
        classNames="navUserName"
      >
        {resetSuccessfull ? (
          <div className="passwordPanel">
            <h1 className="passwordChanged">Password changed!</h1>
            <div
              className="closeContainer"
              onClick={() => setPasswordPanel(false)}
            >
              <CloseIcon className="closeClass" alt="" />
            </div>
          </div>
        ) : (
          <div className="passwordPanel">
            <div
              className="closeContainer"
              onClick={() => setPasswordPanel(false)}
            >
              <CloseIcon className="closeClass" alt="" />
            </div>
            <label className="profileLabel">Current password</label>
            <input
              value={verPassword}
              onChange={(e) => setVerPassword(e.target.value)}
              type="password"
            />
            <label className="profileLabel">New password</label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
            <label className="profileLabel">Confirm new password</label>
            <input
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              type="password"
            />
            <button onClick={changePassword}>Confirm</button>
          </div>
        )}
      </CSSTransition>
    </div>
  );
}
