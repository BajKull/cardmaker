import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { projectFirestore } from "../firebase/Config";
import { ReactComponent as LikeIcon } from "./like.svg";
import { ReactComponent as ViewsIcon } from "../create/icons/eye.svg";
import Masonry from "react-masonry-css";

export default function CardContainer({ category, sorter }) {
  const [cards, setCards] = useState([]);
  // const [limit, setLimit] = useState(18);
  const [loading, setLoading] = useState(true);
  const breakpoints = {
    default: 4,
    1280: 3,
    720: 2,
    500: 1,
  };

  const location = useLocation();

  useEffect(() => {
    setCards([]);
    setLoading(true);
    let order;
    switch (sorter) {
      case "datedesc":
        order = ["date", "desc"];
        break;
      case "date":
        order = ["date"];
        break;
      case "likes":
        order = ["likes", "desc"];
        break;
      case "views":
        order = ["views", "desc"];
        break;
      default:
        order = ["date", "desc"];
    }

    if (category === "all")
      projectFirestore
        .collection("cards")
        .orderBy(...order)
        .get()
        .then((data) => {
          const els = [];
          data.forEach((doc) => {
            const el = { ...doc.data(), id: doc.id };
            els.push(el);
          });
          setLoading(false);
          setCards(els);
        });
    else
      projectFirestore
        .collection("cards")
        .where("category", "==", category)
        .orderBy(...order)
        .get()
        .then((data) => {
          const els = [];
          data.forEach((doc) => {
            const el = { ...doc.data(), id: doc.id };
            els.push(el);
          });
          setLoading(false);
          setCards(els);
        });
  }, [category, sorter]);

  if (loading) return <div className="loadingBig" />;
  else
    return (
      <Masonry
        breakpointCols={breakpoints}
        className="cardContainer"
        columnClassName="cardContainerCol"
      >
        {cards.map((card) => (
          <Link
            to={location.pathname + "/" + card.id}
            className="cardBrowserCard"
            key={card.id}
          >
            <img src={card.thumbnail} alt="preview" className="thumbnail" />
            <div className="cardBrowserCardActions">
              <h1>{card.authorName}</h1>
              <p className="cardRes">
                {card.res.width}x{card.res.height}
              </p>
              <button>
                <LikeIcon className="btnIcon" />
              </button>
              <p>{card.likes}</p>
              <button>
                <ViewsIcon className="btnIcon" />
              </button>
              <p>{card.views}</p>
            </div>
          </Link>
        ))}
      </Masonry>
    );
}
