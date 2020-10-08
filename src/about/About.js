import React from "react";
import { Link } from "react-router-dom";
import GithubIcon from "./github logo.png";
import GmailIcon from "./gmail logo.png";
import LinkedinIcon from "./linkedin logo.png";
import WebIcon from "./web logo.png";
import { ReactComponent as Wave } from "./wave.svg";
import { ReactComponent as Logo } from "../navbar/logo.svg";

export default function About() {
  return (
    <div className="about">
      <div className="aboutBg"></div>
      <Logo className="aboutLogo" />
      <Wave className="aboutWave" />
      <div className="aboutContent">
        <h1>
          What is CardMaker?
          <div className="line"></div>
        </h1>
        <p>
          CardMaker is a free online service which allows users to create cards
          from nothing using built in editor, browse public templates,
          <Link to="/create"> create </Link>
          your own templates and share them or simply downloading created cards
          as a file.
        </p>
        <h1>
          Who made it? <div className="line"></div>
        </h1>
        <p>
          CardMaker is developed by{" "}
          <a href="https://www.linkedin.com/in/dawid-banachowski-24639a1b3/">
            {" "}
            Dawid Banachowski.
          </a>{" "}
          All features were written by me.
        </p>
        <h1>
          Purpose <div className="line"></div>
        </h1>
        <p>
          CardMaker is my project developed for my{" "}
          <a href="https://dbanachowski.netlify.app/">portfolio.</a> Its main
          cause is to show what skills and technologies I'm familiar with.
        </p>
        <h1>
          Contact <div className="line"></div>
        </h1>
        <p>
          If you want to contact me about something, suggest a feature or have a
          business proposition feel free to mail me <b>BajKull@gmail.com</b>
        </p>
        <div className="icons">
          <a href="mailto:bajkull@gmail.com">
            {" "}
            <img src={GmailIcon} alt="" />
          </a>
          <a href="https://github.com/bajkull">
            <img src={GithubIcon} alt="" />
          </a>
          <a href="https://www.linkedin.com/in/dawid-banachowski-24639a1b3/">
            <img src={LinkedinIcon} alt="" />
          </a>
          <a href="https://dbanachowski.netlify.app/">
            <img src={WebIcon} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}
