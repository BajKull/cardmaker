import { projectFirestore, increment } from "./Config";

const incrementCounter = (id) => {
  if (id === "counter")
    projectFirestore
      .collection("cards")
      .doc(id)
      .set({ cards: increment }, { merge: true });
  else
    projectFirestore
      .collection("cards")
      .doc(id)
      .set({ views: increment }, { merge: true });
};

export default incrementCounter;
