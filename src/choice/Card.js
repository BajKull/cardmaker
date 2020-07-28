import React from "react";
import { Link } from "react-router-dom";

export default function Card({ data }) {
  return (
    <Link to={data.link} className="card">
      <h1>{data.title}</h1>
      <p>{data.desc}</p>
      <img src={data.img} alt="" />
    </Link>
  );
}
