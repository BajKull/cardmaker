import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ChangeLoginStatus } from "../redux/actions/ChangeLoginStatus";
import { auth } from "./Config";

const useAuth = () => {
  const dispatch = useDispatch();
  console.log("TET");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        dispatch(ChangeLoginStatus("noUser"));
        auth.signInAnonymously().catch((error) => console.log(error));
      } else if (user) {
        if (user.isAnonymous === false) dispatch(ChangeLoginStatus(user));
        else dispatch(ChangeLoginStatus("noUser"));
      }
    });
  }, [dispatch]);
};

export default useAuth;
