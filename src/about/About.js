import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as GithubIcon } from "./github.svg";
import { ReactComponent as GmailIcon } from "./email.svg";
import { ReactComponent as LinkedinIcon } from "./linkedin2.svg";
import { ReactComponent as WebIcon } from "./db.svg";
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
          <a
            href="https://www.linkedin.com/in/dawid-banachowski-24639a1b3/"
            target="_blank"
            rel="noopener noreferrer"
          >
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
          <a
            href="https://dbanachowski.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            portfolio.
          </a>{" "}
          Its main cause is to show what skills and technologies I'm familiar
          with.
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
            <GmailIcon className="icon emailIcon" />
          </a>
          <a
            href="https://github.com/bajkull"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/dawid-banachowski-24639a1b3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon className="icon" />
          </a>
          <a
            href="https://dbanachowski.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WebIcon className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
}
