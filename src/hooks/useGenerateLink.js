import { useState, useEffect } from "react";
import { projectFirestore, timestamp } from "../firebase/Config";

const useGenerateLink = (elements, uid, displayName) => {
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!uid) {
      setError("You need to sign in first.");
      return;
    }
    const firestoreRef = projectFirestore.collection("cards");

    firestoreRef
      .add({
        author: uid,
        authorName: displayName,
        elements,
        date: timestamp(),
        likes: 0,
      })
      .then((res) => setUrl(res.id));
  }, [elements, displayName, uid]);

  return { url, error };
};

export default useGenerateLink;
