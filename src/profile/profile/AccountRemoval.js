import React, { useState, useRef } from "react";
import { ReactComponent as CloseIcon } from "../../create/icons/close.svg";
import { useDispatch } from "react-redux";
import { ChangeLoginStatus } from "../../redux/actions/ChangeLoginStatus";
import { auth, credential } from "../../firebase/Config";

export default function AccountRemoval({ user, setError }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [password, setPassword] = useState("");
  const [stageOne, setStageOne] = useState(true);
  const deleteBtn = useRef();

  const dispatch = useDispatch();

  const handleDeleteText = (e) => {
    setDeleteText(e.target.value);
    if (e.target.value === "DELETE") {
      deleteBtn.current.disabled = false;
      deleteBtn.current.onclick = () => setStageOne(false);
    } else deleteBtn.current.disabled = true;
  };

  const deleteAccount = () => {
    const newCredential = credential.EmailAuthProvider.credential(
      user.email,
      password
    );

    auth.currentUser
      .reauthenticateWithCredential(newCredential)
      .then(() =>
        auth.currentUser
          .delete()
          .then(() => {
            dispatch(ChangeLoginStatus("noUser"));
          })
          .catch((error) => setError(error.message))
      )
      .catch((error) => setError(error.message));
  };

  const hideConfirmation = () => {
    setShowConfirmation(false);
    setDeleteText("");
    setPassword("");
    setStageOne(true);
  };

  return (
    <div className="profileRemoval profileSection">
      <button onClick={() => setShowConfirmation(true)}>Delete account</button>
      {showConfirmation && (
        <div className="profileRemovalConfirmation">
          <div className="background" onClick={hideConfirmation} />
          {stageOne ? (
            <div className="profileRemovalContainer">
              <CloseIcon
                className="closeClass"
                alt=""
                onClick={hideConfirmation}
              />
              <div className="profileRemovalInfo">
                <h1>
                  <span role="img" aria-label="warning">
                    ⚠️
                  </span>
                  Delete this account?
                </h1>
                <p>
                  This action will permamently delete your account and can not
                  be undone.
                </p>
              </div>
              <div className="profileRemovalMain">
                <p>{user.displayName}</p>
                <label>
                  Type <b>DELETE</b> in order to delete account.
                </label>
                <input
                  value={deleteText}
                  onChange={handleDeleteText}
                  placeholder="DELETE"
                />
                <div className="profileRemovalActions">
                  <button onClick={hideConfirmation}>Cancel</button>
                  <button disabled={true} ref={deleteBtn} className="deleteBtn">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="profileRemovalContainer">
              <CloseIcon
                className="closeClass"
                alt=""
                onClick={hideConfirmation}
              />
              <div className="profileRemovalInfo">
                <h1>In order to complete this action, type your password.</h1>
              </div>
              <div className="profileRemovalMain">
                <label>Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <div className="profileRemovalActions">
                  <button onClick={hideConfirmation}>Cancel</button>
                  <button onClick={() => deleteAccount()} className="deleteBtn">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
