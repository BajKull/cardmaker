import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { projectFirestore } from "../firebase/Config";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import { ReactComponent as LikeIcon } from "../cardbrowser/like.svg";
import { ReactComponent as ViewsIcon } from "../create/icons/eye.svg";

export default function UserCards() {
  const [cards, setCards] = useState([]);
  const user = useSelector((state) => state.loginStatus);
  const breakpoints = {
    default: 4,
    1280: 3,
    720: 2,
    500: 1,
  };

  useEffect(() => {
    projectFirestore
      .collection("cards")
      .where("author", "==", user.uid)
      .get()
      .then((data) => {
        const els = [];
        data.forEach((doc) => {
          const el = { ...doc.data(), id: doc.id };
          els.push(el);
        });
        setCards(els);
      });
  }, [user.uid]);

  return (
    <div className="profilePanel">
      <Masonry
        breakpointCols={breakpoints}
        className="cardContainer"
        columnClassName="cardContainerCol"
      >
        {cards.map((card) => (
          <Link
            to={"/cards/" + card.id}
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
    </div>
  );
}
