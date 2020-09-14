import { useState, useEffect } from "react";
import { projectStorage } from "../firebase/Config";
import { v4 } from "uuid";

const useThumbnail = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (thumbnail) {
      const storageRef = projectStorage.ref(`thumbnails/${v4()}`);

      storageRef.put(thumbnail).on(
        "state_changed",
        (snap) => {
          const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          console.log(error);
          setError(error.message);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          setUrl(url);
        }
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
    thumbnailProgress: progress,
    thumbnailUrl: url,
    thumbnailError: error,
  };
};

export default useThumbnail;
