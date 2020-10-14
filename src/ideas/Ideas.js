import React, { useEffect, useState } from "react";
import { Element } from "react-scroll";
import { projectFirestore } from "../firebase/Config";
import { Link } from "react-router-dom";

export default function Ideas() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    projectFirestore
      .collection("cards")
      .orderBy("views", "desc")
      .limit(3)
      .get()
      .then((data) => {
        const els = [];
        data.forEach((doc) => {
          const el = { ...doc.data(), id: doc.id };
          els.push(el);
        });
        setCards(els);
      });
  }, []);

  return (
    <Element name="idea" className="ideas">
      <h1 className="ideasTitle">Popular</h1>
      <div className="ideasCards">
        {cards.map((card) => (
          <Link to={`/cards/${card.id}`} className="idea" key={card.id}>
            <img className="ideaImg" src={card.thumbnail} alt="" />
            <div className="ideaBg"></div>
            <button className="ideaBtn">Try it</button>
          </Link>
        ))}
      </div>
    </Element>
  );
}
