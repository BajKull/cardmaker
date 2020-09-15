import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import CardCreator from "../create/CardCreator";
import { useDispatch } from "react-redux";
import { setCanvasEl } from "../redux/actions/SetCanvasEl";
import { setCanvasRes } from "../redux/actions/setCanvasRes";

export default function CardEditor() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { data } = useFirestore(location.pathname.split("/").pop());

  useEffect(() => {
    if (data) {
      console.log(data.resolution);
      dispatch(setCanvasEl(data.elements));
      dispatch(setCanvasRes(data.res));
    }
  }, [data, dispatch]);

  return (
    <div>
      <CardCreator />
    </div>
  );
}
