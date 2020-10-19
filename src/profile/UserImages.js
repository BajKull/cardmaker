import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { projectFirestore } from "../firebase/Config";
import { useSelector } from "react-redux";

export default function UserImages() {
  const [images, setImages] = useState([]);
  const breakpoints = {
    default: 4,
    1280: 3,
    720: 2,
    500: 1,
  };

  const user = useSelector((state) => state.loginStatus);

  useEffect(() => {
    projectFirestore
      .collection(user.uid)
      .get()
      .then((data) => {
        const imgs = [];
        data.forEach((doc) => {
          const el = { ...doc.data(), id: doc.id };
          imgs.push(el);
        });
        setImages(imgs);
      });
  }, [user.uid]);

  return (
    <div className="profilePanel">
      <Masonry
        breakpointCols={breakpoints}
        className="cardContainer"
        columnClassName="cardContainerCol"
        style={{ paddingTop: "25px" }}
      >
        {images.map((image) => (
          <div className="cardBrowserCard">
            <img src={image.url} alt={image.name} className="thumbnail" />
          </div>
        ))}
      </Masonry>
    </div>
  );
}
