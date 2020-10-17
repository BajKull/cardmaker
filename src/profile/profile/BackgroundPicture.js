import React, { useState, useEffect } from "react";
import { projectFirestore } from "../../firebase/Config";
import PicUpload from "../PicUpload";

export default function BackgroundPicture({ user, setError }) {
  const [bg, setBg] = useState(null);
  const [backgroundPic, setBackgroundPic] = useState(null);

  const handleBackgroundProc = () => {
    document.getElementsByClassName("hiddenBackground")[0].click();
  };

  const backgroundUpload = (event) => {
    const file = event.target.files[0];

    const formats = ["image/jpg", "image/jpeg", "image/png"];

    if (file && formats.includes(file.type)) {
      setBackgroundPic(file);
      setError(null);
    } else {
      setBackgroundPic(null);
      setError("Incorrect file format");
    }
  };

  useEffect(() => {
    projectFirestore
      .collection(user.uid)
      .doc("background")
      .get()
      .then((data) => {
        if (data.data() === null)
          setBg(
            "https://firebasestorage.googleapis.com/v0/b/cardmaker-e6704.appspot.com/o/global%20background.png?alt=media&token=80fb2371-17e9-4cca-8748-2aaf432b3140"
          );
        else setBg(data.data().url);
      });
  }, [user.uid]);
  return (
    <div className="profileBackground profileSection">
      <img src={bg} alt="" className="profileBackgroundBg" />
      <div className="profileText">
        <button onClick={handleBackgroundProc}>Change background</button>
        <input
          type="file"
          accept="image/png, image/jpeg, image/png"
          className="hiddenInput hiddenBackground"
          onChange={backgroundUpload}
        />
        <p>
          Picture has to be formatted as .jpg, .jpeg or .png. Optimal size is
          1920x300
        </p>
      </div>
      {backgroundPic && <PicUpload file={backgroundPic} type="background" />}
    </div>
  );
}
