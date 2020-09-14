import React from "react";
import Card from "./Card";

export default function Cards() {
  const cards = [
    {
      title: "Birthday card",
      desc: "Show someone you care about that you remember about them!",
      img: "img",
      link: "/create/birthday",
    },
    {
      title: "Invitation card",
      desc: "Invite someone to a wedding, party or anything else!",
      img: "img",
      link: "/create/invitation",
    },
    {
      title: "Custom card",
      desc: "Sky is the limit, create anything that comes to your mind!",
      img: "img",
      link: "/create/custom",
    },
  ];
  return (
    <div className="cards">
      {cards.map((card, i) => (
        <Card data={card} key={i} />
      ))}
    </div>
  );
}
