import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { useSelector } from "react-redux";
import { auth } from "../firebase/Config";

export default function PicUpload({ file }) {
  const user = useSelector((state) => state.loginStatus);
  const { progress, url, error } = useStorage(file, user.uid, false);

  useEffect(() => {
    if (url) auth.currentUser.updateProfile({ photoURL: url });
  }, [url]);

  console.log(url);

  if (error) return <p className="error">{error}</p>;
  else
    return (
      <div className="progressBar">
        {url && (
          <div className="uploadComplete">
            <h1>Upload complete</h1>
          </div>
        )}
        {url ? (
          <div
            className="bar barComplete"
            style={{ width: `${progress}%` }}
          ></div>
        ) : (
          <div className="bar" style={{ width: `${progress}%` }}></div>
        )}
      </div>
    );
}
