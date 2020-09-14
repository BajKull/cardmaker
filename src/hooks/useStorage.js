import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/Config";

const useStorage = (file, uid) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!uid) {
      setError("You need to sign in first.");
      return;
    }
    const storageRef = projectStorage.ref(file.name);
    const firestoreRef = projectFirestore.collection(uid);

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const time = timestamp();
        await firestoreRef.add({ name: file.name, url, date: time });
        setUrl(url);
      }
    );
  }, [file, uid]);

  return { progress, url, error };
};

export default useStorage;