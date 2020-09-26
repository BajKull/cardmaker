import { useState, useEffect } from "react";
import { projectStorage } from "../firebase/Config";
import { v4 } from "uuid";

const useThumbnail = () => {
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (thumbnail) {
      const storageRef = projectStorage.ref(`thumbnails/${v4()}`);
      storageRef
        .put(thumbnail)
        .then(async () => {
          const url = await storageRef.getDownloadURL();
          setUrl(url);
        })
        .catch(() =>
          setError(
            "There was an error connecting to the database. Try again later."
          )
        );
    }
  }, [thumbnail]);

  useEffect(() => {
    const canvas = document.getElementsByClassName("editorCanvas")[0];
    canvas.toBlob(
      (blob) => {
        setThumbnail(blob);
      },
      "image/jpeg",
      0.75
    );
  }, []);

  return {
    thumbnailUrl: url,
    thumbnailError: error,
  };
};

export default useThumbnail;
