import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/Config";

const useCardsCounter = () => {
  const [cards, setCards] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    projectFirestore
      .collection("cards")
      .doc("counter")
      .get()
      .then((doc) => {
        setCards(doc.data().cards);
      })
      .catch(() => setError("2536"));
  }, []);

  return { cards, error };
};

export default useCardsCounter;
