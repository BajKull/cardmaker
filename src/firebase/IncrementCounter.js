import { projectFirestore, increment } from "./Config";

const incrementCounter = (id) => {
  projectFirestore
    .collection("cards")
    .doc(id)
    .set({ views: increment }, { merge: true });
};

export default incrementCounter;
