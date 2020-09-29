import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/Config";
import incrementCounter from "../firebase/IncrementCounter";

const useFirestore = (link) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    projectFirestore
      .collection("cards")
      .doc(link)
      .get()
      .then((doc) => {
        setData(doc.data());
        if (doc.data()) incrementCounter(link);
        else setError("Invalid URL");
      })
      .catch(() => setError("Invalid URL"));
  }, [link]);

  return { data, error };
};

export default useFirestore;
