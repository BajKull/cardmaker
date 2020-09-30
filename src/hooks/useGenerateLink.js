import { useState, useEffect } from "react";
import useThumbnail from "./useThumbnail";
import incrementCounter from "../firebase/IncrementCounter";
import { projectFirestore, timestamp } from "../firebase/Config";
import { useSelector } from "react-redux";

const useGenerateLink = () => {
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [generated, setGenerated] = useState(false);

  const elements = useSelector((state) => state.canvasEls);

  const resolution = useSelector((state) => state.canvasRes);
  const user = useSelector((state) => state.loginStatus);
  const uid = user.uid;
  const displayName = user.displayName;

  const { thumbnailUrl, thumbnailError } = useThumbnail();

  useEffect(() => {
    if (generated) return;
    if (!uid) {
      setError("You need to sign in first.");
      return;
    } else if (thumbnailError) {
      setError(thumbnailError);
      return;
    } else if (thumbnailUrl) {
      const firestoreRef = projectFirestore.collection("cards");
      const els = elements.map((el) => {
        if (el.type !== "image") return el;
        const newEl = { ...el };
        newEl.image = null;
        return newEl;
      });
      const unsub = () =>
        firestoreRef.add({
          author: uid,
          authorName: displayName,
          elements: els,
          date: timestamp(),
          likes: 0,
          views: 0,
          res: resolution,
          category: "unchecked",
          thumbnail: thumbnailUrl,
        });

      unsub()
        .then((res) => setUrl(res.id))
        .catch((er) => console.log(er.message));
      setGenerated(true);
      incrementCounter("counter");

      // memory leak if you close popup before getting link
      // needs fix!
    }
  }, [
    elements,
    resolution,
    uid,
    displayName,
    thumbnailError,
    thumbnailUrl,
    generated,
  ]);

  return { url, error };
};

export default useGenerateLink;
