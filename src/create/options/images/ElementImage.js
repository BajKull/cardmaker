import React, { useState, useEffect, useRef } from "react";
import ImageGrid from "./ImageGrid";
import UploadScreen from "./UploadScreen";
import ProgressBar from "./ProgressBar";
import { projectFirestore } from "../../../firebase/Config";
import { useSelector } from "react-redux";

export default function ElementImage() {
  const [images, setImages] = useState([]);
  const [userImages, setUserImages] = useState([]);
  const [imagesSource, setImagesSource] = useState("global");
  const [loading, setLoading] = useState(true);
  const [uploadScreen, setUploadScreen] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const uploadFileRef = useRef(null);

  const user = useSelector((state) => state.loginStatus);

  // images from global storage
  useEffect(() => {
    projectFirestore
      .collection("images")
      .get()
      .then((data) => {
        const els = [];
        data.forEach((doc) => {
          const el = { ...doc.data(), id: doc.id };
          els.push(el);
        });
        setLoading(false);
        setImages(els);
      });
  }, []);

  // images that user uploaded
  useEffect(() => {
    if (!user.uid) return;

    const unsub = projectFirestore.collection(user.uid).onSnapshot((snap) => {
      const els = [];
      snap.forEach((doc) => {
        els.push({ ...doc.data(), id: doc.id });
      });
      setUserImages(els);
    });

    return () => unsub();
  }, [user.uid]);

  const uploadLink = () => {
    setUploadScreen(true);
  };

  const uploadFileReFun = () => uploadFileRef.current.click();

  const uploadFile = (event) => {
    const file = event.target.files[0];

    const formats = ["image/jpg", "image/jpeg", "image/png"];

    if (file && formats.includes(file.type)) {
      setFile(file);
      setError(null);
    } else {
      setFile(null);
      setError("Incorrect file format");
    }
  };

  return (
    <div className="canvasImageOptions">
      <div className="buttonsContainer">
        <button onClick={() => setImagesSource("global")}>Global images</button>
        <button onClick={() => setImagesSource("user")}>My images</button>
      </div>
      <ImageGrid
        images={images}
        loading={loading}
        userImages={userImages}
        imagesSource={imagesSource}
        uid={user.uid}
      />
      <div className="buttonsContainer">
        <button onClick={uploadLink}>Image from link</button>
        <input
          className="hiddenInput uploadFile"
          ref={uploadFileRef}
          onChange={uploadFile}
          type="file"
          name="file"
          accept=".jpg, .jpeg, .png"
        />
        <button onClick={uploadFileReFun}>Upload file</button>
      </div>
      {error && <p>{error}</p>}
      {file && <ProgressBar file={file} setFile={setFile} />}
      {uploadScreen && (
        <UploadScreen
          uploadUrl={uploadUrl}
          setUploadUrl={setUploadUrl}
          setUploadScreen={setUploadScreen}
        />
      )}
    </div>
  );
}
