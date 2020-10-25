import React, { useEffect, useRef } from "react";

export default function TextShadow({ children }) {
  const shadowRef = useRef(null);

  useEffect(() => {
    const scroll = () => {
      const elPos = shadowRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      // console.log(scrollPos + windowHeight, elPos, children);
      if (elPos - windowHeight / 1.5 <= 0) {
        shadowRef.current.childNodes[0].classList.remove("shadowHidden");
      }
    };

    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <span className="shadowRel" ref={shadowRef}>
      <span className="shadow shadowHidden">{children}</span>
      {children}
    </span>
  );
}
