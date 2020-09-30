import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import CardCreator from "../create/CardCreator";
import NotFound from "../notfound/NotFound";
import { useDispatch } from "react-redux";
import { setCanvasEl } from "../redux/actions/SetCanvasEl";
import { setCanvasRes } from "../redux/actions/setCanvasRes";

export default function CardEditor() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(undefined);
  const [elements, setElements] = useState([]);

  const { data, error } = useFirestore(location.pathname.split("/").pop());

  useEffect(() => {
    if (data) {
      setCounter(data.elements.filter((el) => el.type === "image").length);
      setElements(
        data.elements.map((el) => {
          if (el.type !== "image") return el;
          const newEl = { ...el };
          const img = new Image();
          const source = el.src;
          img.crossOrigin = "anonymous";
          newEl.image = img;
          img.onload = () => {
            setCounter((c) => c - 1);
          };
          img.src = source;
          return newEl;
        })
      );
      dispatch(setCanvasRes(data.res));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (counter === 0) dispatch(setCanvasEl(elements));
  }, [counter, elements, dispatch]);

  if (error) return <NotFound />;
  else if (data) return <CardCreator />;
  else return null;
}
