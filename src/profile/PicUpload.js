import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { useSelector } from "react-redux";
import { auth, projectFirestore } from "../firebase/Config";

export default function PicUpload({ file, type }) {
  const user = useSelector((state) => state.loginStatus);
  const { progress, url, error } = useStorage(file, user.uid, false);

  useEffect(() => {
    if (url) {
      if (type === "avatar") auth.currentUser.updateProfile({ photoURL: url });
      else if (type === "background")
        projectFirestore
          .collection(user.uid)
          .doc("background")
          .set({ url: url });
    }
  }, [type, url, user.uid]);

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
