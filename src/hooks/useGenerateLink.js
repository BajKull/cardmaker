import { useState, useEffect } from "react";
import useThumbnail from "./useThumbnail";
import { projectFirestore, timestamp } from "../firebase/Config";

const useGenerateLink = (elements, uid, displayName) => {
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const { thumbnailProgress, thumbnailUrl, thumbnailError } = useThumbnail();

  useEffect(() => {
    if (!uid) {
      setError("You need to sign in first.");
      return;
    } else if (thumbnailError) {
      setError(thumbnailError);
      return;
    } else if (thumbnailUrl) {
      const firestoreRef = projectFirestore.collection("cards");

      firestoreRef
        .add({
          author: uid,
          authorName: displayName,
          elements,
          date: timestamp(),
          likes: 0,
          views: 0,
          category: "unchecked",
          thumbnail: thumbnailUrl,
        })
        .then((res) => setUrl(res.id));
    }
  }, [elements, displayName, uid, thumbnailError, thumbnailUrl]);

  return { url, error };
};

export default useGenerateLink;
