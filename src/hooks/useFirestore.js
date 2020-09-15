import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/Config";

const useFirestore = (link) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    projectFirestore
      .collection("cards")
      .doc(link)
      .get()
      .then((doc) => {
        setData(doc.data());
      });
  }, [link]);

  return { data };
};

export default useFirestore;
