import React, { useEffect } from "react";
import useStorage from "../../../hooks/useStorage";
import { useSelector } from "react-redux";

export default function ProgressBar({ file, setFile }) {
  const user = useSelector((state) => state.loginStatus);
  const { progress, url, error } = useStorage(file, user.uid);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  if (error) return <p className="error">{error}</p>;
  else
    return (
      <div className="progressBar">
        <div className="bar" style={{ width: `${progress}%` }}></div>
      </div>
    );
}
