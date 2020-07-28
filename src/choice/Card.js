import React from "react";

export default function Card({ data }) {
  return (
    <div className="card">
      <h1>{data.title}</h1>
      <p>{data.desc}</p>
      <img src={data.img} alt="" />
      <p>{data.link}</p>
    </div>
  );
}
