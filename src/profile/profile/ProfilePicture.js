import React, { useState } from "react";
import PicUpload from "../PicUpload";

export default function ProfilePicture({ user, setError }) {
  const [profilePic, setProfilePic] = useState(null);

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

  return (
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
      {profilePic && <PicUpload file={profilePic} type="avatar" />}
    </div>
  );
}
